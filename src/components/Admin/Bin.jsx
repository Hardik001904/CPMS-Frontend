import { AlertCircle, RotateCcw, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { fetchUser } from "../../services/studentService";
import { deleteUserPermanently, getBinUsers, restoreUser } from "../../services/adminService";

export default function Bin({ onUpdateUsers }) {
  const [isLoading, setIsLoading] = useState(true);
  const [allUsers, setallUsers] = useState([]);
  const [binUsers, setBinUsers] = useState([]);

  const fetchBin = async () => {
    try {
      const data = await getBinUsers();
      setBinUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllUsers = async () => {
    try {
      const res = await fetchUser();
      setallUsers(res.count);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const loadBinUsers = async () => {
      try {
        setIsLoading(true);
        const data = await getBinUsers();
        setBinUsers(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBinUsers();
    fetchBin();
    getAllUsers();
  }, []);

const handleRestore = async (id) => {
  try {

    await restoreUser(id);

    // refresh bin list
    fetchBin();

  } catch (error) {
    console.log(error);
  }
};


const handleDeletePermanently = async (id) => {

  if (!window.confirm("Delete this user permanently?")) return;
  try {
    await deleteUserPermanently(id);
    // refresh bin list
    fetchBin();
  } catch (error) {
    console.log(error);
  }
};

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-2xl font-black text-slate-900  tracking-tight">
            Recycle Bin
          </h3>
          <p className="text-slate-500 font-medium text-sm">
            Manage rejected applications. Restore or permanently delete records.
          </p>
        </div>
        <div className="bg-rose-600/10 text-rose-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
          {binUsers.length} Rejected Records
        </div>
      </div>

      {binUsers.length === 0 ? (
        <div className="bg-white p-20 rounded-3xl border border-dashed border-slate-200 text-center">
          <Trash2 className="w-12 h-12 text-slate-200 mx-auto mb-4" />
          <p className="text-slate-400 font-bold  tracking-tight text-sm">
            Bin is empty. No rejected users found.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {binUsers.map((u) => (
            <div
              key={u._id}
              className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col md:flex-row justify-between items-center group transition-all hover:border-rose-300 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center font-black text-xl  text-slate-400 shadow-inner">
                  {u.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-black text-slate-900 tracking-tight">
                      {u.name}
                    </h4>
                    <span className="text-[8px] font-black uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded text-slate-500">
                      {u.role}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">
                    {u.email}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 mt-4 md:mt-0">
                <button
                  onClick={() => handleRestore(u._id)}
                  className="flex items-center gap-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 border border-emerald-100"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Restore
                </button>
                <button
                  onClick={() => handleDeletePermanently(u._id)}
                  className="flex items-center gap-2 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 border border-rose-100"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete Permanently
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
        <div className="text-xs text-amber-800 font-medium leading-relaxed">
          <p className="font-black uppercase tracking-widest text-[9px] mb-1">
            Security Protocol
          </p>
          Rejected users cannot log in or access any institutional resources.
          Restoring a user will move them back to the pending verification
          queue.
        </div>
      </div>
    </div>
  );
}

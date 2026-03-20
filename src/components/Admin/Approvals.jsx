import { CheckCircle2, XCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  approveUser,
  getPendingApprovals,
  rejectUser,
} from "../../services/adminService";
import { UserRole } from "../../pages/AdminDashboard";

export default function Approvals() {
  const [pending, setPending] = useState([]);

  const fetchPendingUsers = async () => {
    try {
      const data = await getPendingApprovals();
      setPending(data);
    } catch (error) {
      console.error("Failed to load pending users", error);
    }
  };

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  //ADD THE FUNCTION HERE
  const handleAction = async (id, action) => {
    try {
      if (action === "approve") {
        await approveUser(id);
      }

      if (action === "reject") {
        await rejectUser(id);
      }

      // refresh pending list from backend
      await fetchPendingUsers();
    } catch (error) {
      console.error("Approval failed", error);
    }
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-2xl font-black text-slate-900  tracking-tight">
            Pending Verifications
          </h3>
          <p className="text-slate-500 font-medium">
            Verify credentials for new institutional participants.
          </p>
        </div>
        <div className="bg-blue-600/10 text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
          {pending.length} Requests Pending
        </div>
      </div>

      {pending.length === 0 ? (
        <div className="bg-white p-20 rounded-3xl border border-dashed border-slate-200 text-center">
          <CheckCircle2 className="w-12 h-12 text-slate-200 mx-auto mb-4" />
          <p className="text-slate-400 font-bold  tracking-tight">
            Queue Clear. No pending approvals found.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {pending.map((u) => (
            <div
              key={u._id}
              className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col md:flex-row justify-between items-center group transition-all hover:border-blue-300"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl  shadow-inner ${u.role === UserRole.STUDENT ? "bg-indigo-50 text-indigo-600" : "bg-purple-50 text-purple-600"}`}
                >
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
                  // onClick={() => handleAction(u._id, true)}
                  onClick={() => handleAction(u._id, "approve")}
                  className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all active:scale-95"
                >
                  <CheckCircle2 className="w-4 h-4" /> Verify
                </button>
                <button
                  onClick={() => handleAction(u._id, "reject")}
                  // onClick={() => handleAction(u._id)}
                  className="flex items-center gap-2 bg-white border border-slate-200 text-rose-600 hover:bg-rose-50 px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all active:scale-95"
                >
                  <XCircle className="w-4 h-4" /> Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

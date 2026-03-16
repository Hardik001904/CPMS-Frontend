import { Eye } from "lucide-react";
import React, { useEffect, useState } from "react";
import { fetchStudents } from "../../services/adminService";
import { useNavigate } from "react-router-dom";

export default function StudentDirectory() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  const loadstudents = async () => {
    try {
      const data = await fetchStudents();
      console.log("data", data);
      setStudents(data);
    } catch (error) {
      console.log("Failed to fetch students", error);
    }
  };

  useEffect(() => {
    loadstudents();
  }, []);

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">

      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-black text-slate-900 tracking-tight">
          Student Directory
        </h3>

        <div className="bg-blue-600/10 text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
          {students.length} Students
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          
          {/* Table Head */}
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Candidate
              </th>

              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Enrollment
              </th>

              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Department
              </th>

              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">
                Action
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-50">
            {students.length > 0 ? (
              students.map((s) => (
                <tr
                  key={s._id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-900">{s.name}</p>
                    <p className="text-xs text-slate-500">{s.email}</p>
                  </td>

                  <td className="px-6 py-4 text-xs font-black text-slate-600 tracking-wider">
                    {s.profile?.enrollmentNumber || "N/A"}
                  </td>

                  <td className="px-6 py-4 text-xs font-bold text-slate-500">
                    {s.profile?.department || "Unassigned"}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() =>
                        navigate(`/dashboard/admin/students/${s._id}`)
                      }
                      className="p-2 text-slate-300 hover:text-blue-500 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-8 text-sm text-slate-400"
                >
                  No students found
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}


import { Trash2 } from "lucide-react";
import React from "react";

import allUsers from "../../../utils/JSON/cpms_all_users.json";
import { UserRole } from "../../pages/AdminDashboard";

export default function StudentDirectory() {
  const students = allUsers.filter(
    (u) => u.role === UserRole.STUDENT && u.isApproved,
  );
  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <h3 className="text-2xl font-black text-slate-900  tracking-tight">
        Student Directory
      </h3>
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left">
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
          <tbody className="divide-y divide-slate-50">
            {students.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
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
                    onClick={() => handleAction(s.id, false)}
                    className="p-2 text-slate-300 hover:text-rose-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import React from "react";
import { MapPin, Trash2, Users } from "lucide-react";

import allUsers from "../../../utils/JSON/cpms_all_users.json";
import { UserRole } from "../../pages/AdminDashboard";

export default function HiringPartners() {
  const companies = allUsers.filter(
    (u) => u.role === UserRole.COMPANY && u.isApproved,
  );

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <h3 className="text-2xl font-black text-slate-900  tracking-tight">
        Hiring Partners
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((c) => (
          <div
            key={c.id}
            className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:border-blue-400 transition-all group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black text-2xl  group-hover:bg-blue-600 transition-colors">
                {c.name.charAt(0)}
              </div>
              <button
                onClick={() => handleAction(c.id, false)}
                className="text-slate-300 hover:text-rose-500"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <h4 className="font-black text-xl text-slate-900 mb-1">{c.name}</h4>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
              {c.profile?.industry || "Technology"}
            </p>
            <div className="space-y-3 pt-4 border-t border-slate-50">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <MapPin className="w-3 h-3" /> {c.profile?.location || "Global"}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-600 font-bold">
                <Users className="w-3 h-3" />{" "}
                {c.profile?.size || "Scale: Large"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

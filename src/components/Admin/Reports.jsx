import React, { Activity } from "react";

import allUsers from "../../../utils/JSON/cpms_all_users.json";

export default function Reports() {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <h3 className="text-2xl font-black text-slate-900  tracking-tight">
        Placement Intelligence
      </h3>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8">
            Approval Velocity
          </h4>
          <div className="space-y-6">
            <div className="flex justify-between items-end">
              <span className="text-xs font-black text-slate-700 uppercase">
                Verification Progress
              </span>
              <span className="text-2xl font-black ">
                {Math.round(
                  (allUsers.filter((u) => u.isApproved).length /
                    allUsers.length) *
                    100,
                )}
                %
              </span>
            </div>
            <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-[78%] transition-all duration-1000"></div>
            </div>
          </div>
        </div>
        <div className="bg-[#0a0f1d] p-10 rounded-[2.5rem] text-white shadow-xl">
          <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-8">
            System Activity
          </h4>
          <div className="flex items-center gap-6">
            <div className="p-4 bg-blue-600 rounded-2xl">
              <Activity className="w-8 h-8 text-white animate-pulse" />
            </div>
            <div>
              <p className="text-3xl font-black  tracking-tight">
                LATEST SYNC
              </p>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                Session Protocol Active
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

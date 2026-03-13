import { Briefcase, FileCheck } from "lucide-react";
import React from "react";

import jobs from "../../../utils/JSON/cpms_jobs.json"
import applications from "../../../utils/JSON/cpms_apps.json"

export default function LiveActivities() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-black text-slate-900">
          Live Campus Activities
        </h3>
        <div className="flex gap-2 text-[10px] font-black uppercase tracking-widest">
          <span className="flex items-center gap-1 text-blue-600">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-ping"></div>{" "}
            Live Monitoring
          </span>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
          <h4 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-600" /> Latest Job Openings
          </h4>
          <div className="space-y-4">
            {jobs.slice(0, 5).map((job) => (
              <div
                key={job.id}
                className="p-4 bg-slate-50 rounded-2xl flex justify-between items-center border border-slate-100"
              >
                <div>
                  <p className="font-black text-slate-900">{job.title}</p>
                  <p className="text-xs text-slate-500 font-bold">
                    {job.companyName} • {job.location}
                  </p>
                </div>
                <span className="text-[9px] font-black bg-blue-100 text-blue-600 px-2 py-1 rounded uppercase">
                  {job.salary}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
          <h4 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-emerald-600" /> Recent
            Applications
          </h4>
          <div className="space-y-4">
            {applications.slice(0, 5).map((app) => (
              <div
                key={app.id}
                className="p-4 bg-slate-50 rounded-2xl flex justify-between items-center border border-slate-100"
              >
                <div>
                  <p className="font-black text-slate-900">{app.studentName}</p>
                  <p className="text-xs text-slate-500 font-bold">
                    Applied for {app.jobTitle} at {app.companyName}
                  </p>
                </div>
                <span className="text-[9px] font-black bg-emerald-100 text-emerald-600 px-2 py-1 rounded uppercase tracking-widest">
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import {
  fetchMyJobs,
  updateJobRequirements,
  updateJobStatus,
} from "../../services/companyService";

export default function MyJob() {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    getJobs();
  }, []);

  const formatDate = (date) => {
    if (!date) return "-";
    const d = new Date(date);
    if (isNaN(d)) return "-";
    return d.toLocaleDateString();
  };

  const getJobs = async () => {
    try {
      const res = await fetchMyJobs();
      setJobs(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const companyJobs = jobs;
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 space-y-6 animate-in slide-in-from-bottom-4">
      <h3 className="text-2xl font-black text-slate-900  tracking-tight">
        Manage Requirements
      </h3>
      <div className="hidden md:block bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left min-w-[600px]">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Active Role
              </th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Date Posted
              </th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Deadline
              </th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Status
              </th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {companyJobs.map((job) => (
              <tr
                key={job._id}
                className="hover:bg-slate-50/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <p className="font-black text-slate-900 ">{job.title}</p>
                  <p className="text-[10px] text-slate-500 font-bold">
                    {job.location}
                  </p>
                </td>
                <td className="px-6 py-4 text-xs font-bold text-slate-600">
                  {formatDate(job.postedDate)}
                </td>
                <td className="px-6 py-4 text-xs font-bold text-slate-600">
                  {formatDate(job.deadline)}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${job.status === "Open" ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"}`}
                  >
                    {job.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={async () => {
                      try {
                        await updateJobStatus(job._id);
                        console.log("API CALLED");

                        setJobs((prev) =>
                          prev.map((j) =>
                            j._id === job._id
                              ? {
                                  ...j,
                                  status:
                                    j.status === "Open" ? "Closed" : "Open",
                                }
                              : j,
                          ),
                        );
                      } catch (error) {
                        console.log(error);
                      }
                    }}
                    className="text-[10px] font-black uppercase text-blue-600 hover:underline tracking-widest"
                  >
                    {job.status === "Open" ? "Close" : "Re-open"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="md:hidden space-y-4">
        {companyJobs?.map((job) => (
          <div
            key={job._id}
            className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3"
          >
            {/* Job Title */}
            <div>
              <h4 className="font-black text-slate-900 text-base">
                {job.title}
              </h4>
              <p className="text-xs text-slate-500 font-bold">{job.location}</p>
            </div>

            {/* Dates */}
            <div className="flex justify-between text-xs font-bold text-slate-600">
              <span>Posted:</span>
              <span>{formatDate(job.postedDate)}</span>
            </div>

            <div className="flex justify-between text-xs font-bold text-slate-600">
              <span>Deadline:</span>
              <span>{formatDate(job.deadline)}</span>
            </div>

            {/* Status + Action */}
            <div className="flex justify-between items-center">
              <span
                className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest ${
                  job.status === "Open"
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {job.status}
              </span>

              <button
                onClick={async () => {
                  try {
                    await updateJobStatus(job._id);

                    setJobs((prev) =>
                      prev.map((j) =>
                        j._id === job._id
                          ? {
                              ...j,
                              status: j.status === "Open" ? "Closed" : "Open",
                            }
                          : j,
                      ),
                    );
                  } catch (error) {
                    console.log(error);
                  }
                }}
                className="text-[10px] font-black uppercase text-blue-600 tracking-widest"
              >
                {job.status === "Open" ? "Close" : "Re-open"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

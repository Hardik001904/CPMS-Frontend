import React, { useEffect, useState } from "react";
import {
  fetchMyJobs,
  updateJobRequirements,
} from "../../services/companyService";

export default function MyJob() {
  const [jobs, setJobs] = useState([]);
  // const user = JSON.parse(sessionStorage.getItem("user")) || {};
  useEffect(() => {
    getJobs();
  }, []);

  const getJobs = async () => {
    try {
      const res = await fetchMyJobs();
      // console.log("API Response:", res.data);
      setJobs(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // const companyJobs = jobs?.filter((j) => j.companyId === user._id);
  const companyJobs = jobs;
  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4">
      <h3 className="text-2xl font-black text-slate-900  tracking-tight">
        Manage Requirements
      </h3>
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Active Role
              </th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Date Posted
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
                  {new Date(job.postedDate).toISOString().slice(0, 10)}
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
                    // onClick={() => {
                    //   const updated = companyJobs.map((j) =>
                    //     j._id === job._id
                    //       ? {
                    //           ...j,
                    //           status: j.status === "Open" ? "Closed" : "Open",
                    //         }
                    //       : j,
                    //   );
                    //   // onUpdateJobs(updated);
                    //     setJobs(updated);
                    // }}
                    onClick={async () => {
                      try {
                        await updateJobRequirements(job._id);

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
    </div>
  );
}

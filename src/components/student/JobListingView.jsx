import { useEffect, useRef, useState } from "react";
import { fetchAllJobs, fetchCompanyById } from "../../services/companyService";
import { Activity, Globe, Info, Underline, X } from "lucide-react";
import toast from "react-hot-toast";
import {
  applyToJob,
  getStudentApplication,
} from "../../services/applicationservices";
import { useNavigate } from "react-router-dom";

export const JobListingView = () => {
  const [viewingCompany, setViewingCompany] = useState(null);
  const [studentApps, setStudentApps] = useState([]);
  const [jobs, setJobs] = useState([]);

  const navigate = useNavigate();
  const handleApply = async (jobId) => {
    try {
      const res = await applyToJob(jobId);
      console.log("handleApply", res);
      toast.success(res.message);
      navigate("/dashboard/student/applications");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const getApplicationByStudent = async () => {
    try {
      const res = await getStudentApplication();
      setStudentApps(res.application);
      console.log("res getApplicationByStudent", res);
      // toast.success(res.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const onViewCompany = async (cId) => {
    console.log("in side company", cId);
    try {
      const company = await fetchCompanyById(cId);
      console.log("my company data", company);
      if (company) setViewingCompany(company);
    } catch (error) {
      toast.error("Failed to load company details ");
    }
  };

  const getJobs = async () => {
    try {
      const res = await fetchAllJobs();
      setJobs(res.data);
      console.log("getJobs", res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    getJobs();
    getApplicationByStudent();
  }, []);

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-8 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-3xl font-black text-slate-900 tracking-tight ">
            Corporate Openings
          </h3>
          <p className="text-slate-500 font-medium">
            Opportunities curated for the Batch of 2026.
          </p>
        </div>
        <div className="bg-blue-600/5 border border-blue-600/10 px-5 py-2.5 rounded-2xl flex items-center gap-3">
          <Activity className="w-4 h-4 text-blue-600 animate-pulse" />
          <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
            {jobs.length} Active Drives
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {jobs.map((job) => {
          const hasApplied = studentApps.some((a) => a.jobId === job._id);

          return (
            <div
              key={job._id}
              className="bg-white p-8 rounded-3xl border border-slate-200 flex flex-col justify-between hover:border-blue-400 transition-all group shadow-sm hover:shadow-2xl"
            >
              <div>
                <h4 className="font-black text-lg md:text-xl text-slate-900 tracking-tighter group-hover:text-blue-600 transition-colors mb-2 leading-none">
                  {job.title}
                </h4>
                <p className="text-slate-500 text-sm font-bold">
                  {job.companyName} • {job.location}
                </p>
                <p className="text-[15px] font-black text-emerald-600 tracking-tight mt-1 mb-8">
                  {job.salary}
                </p>

                <div className="space-y-4 mb-10">
                  <div className="flex items-start gap-3">
                    <Info className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                    <p className="text-xs text-slate-600 font-medium line-clamp-2 leading-relaxed">
                      {job.description}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  disabled={hasApplied}
                  onClick={() => handleApply(job._id)}
                  className={`w-full px-3 py-3 rounded-xl font-black text-xs transition-all active:scale-95 shadow-xl uppercase tracking-widest ${
                    hasApplied
                      ? "bg-emerald-50 text-emerald-600 border border-emerald-100 cursor-not-allowed shadow-none"
                      : "bg-[#0a0f1d] text-white hover:bg-blue-600"
                  }`}
                >
                  {hasApplied ? "Verified Submission" : "Apply Now"}
                </button>
                <button
                  className={`w-full px-3 py-3 rounded-xl font-black text-xs transition-all active:scale-95 shadow-xl uppercase tracking-widest bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-none`}
                  onClick={() => onViewCompany(job.companyId)}
                >
                  View
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {viewingCompany && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            onClick={() => setViewingCompany(null)}
          ></div>
          <div className="relative bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            <div className="bg-indigo-700 p-12 text-white relative">
              <button
                onClick={() => setViewingCompany(null)}
                className="absolute top-8 right-8 p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X />
              </button>
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-blue-500 rounded-3xl flex items-center justify-center font-black text-4xl shadow-xl ">
                  {viewingCompany.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-4xl font-black tracking-tighter ">
                    {viewingCompany.name}
                  </h3>
                  <div className="flex gap-4 mt-2">
                    <span className="text-[11px] font-black  uppercase tracking-widest text-slate-200">
                      Industry: {viewingCompany.profile?.industry}
                    </span>
                    <span className="text-[11px] font-black uppercase tracking-widest text-slate-200">
                      HQ: {viewingCompany.profile.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-12 space-y-8">
              <div>
                <h4 className="text-xs font-black text-[#65676B] uppercase tracking-widest mb-3">
                  Corporate Mission
                </h4>
                <p className="text-[#1C1E21] pl-2 font-medium leading-relaxed ">
                  "
                  {viewingCompany.profile?.description ||
                    "No corporate description provided."}
                  "
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-indigo-400">
                <div>
                  <h4 className="pl-8 text-xs font-black text-[#65676B] uppercase tracking-widest mb-1">
                    Lead Recruiter
                  </h4>
                  <p className="pl-14 font-black text-slate-900">
                    {viewingCompany.profile?.hrName}
                  </p>
                </div>
                <div>
                  <h4 className="pl-22 text-xs font-black text-[#65676B] uppercase tracking-widest mb-1">
                    Digital Presence
                  </h4>
                  <a
                    href={viewingCompany.profile.website}
                    target="_blank"
                    className="pl-21 font-black text-blue-600 hover:underline flex items-center gap-2"
                  >
                    <Globe className="w-4 h-4" />Visit Website
                    
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import { useEffect, useRef, useState } from "react";
import { fetchAllJobs, fetchCompanyById } from "../../services/companyService";
import {
  Activity,
  CheckCircle2,
  Globe,
  Info,
  Underline,
  X,
  XCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  applyToJob,
  getStudentApplication,
} from "../../services/applicationservices";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContect";
import { fetchJobById } from "../../services/studentService";

export const JobListingView = () => {
  const [viewingCompany, setViewingCompany] = useState(null);
  const [studentApps, setStudentApps] = useState([]);
  const [jobs, setJobs] = useState([]);

  const navigate = useNavigate();
  // const { user } = useAuth();
  const userData = sessionStorage.getItem("user")
  const user = JSON.parse(userData)
  
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

  const onViewCompany = async (jId) => {
    console.log("in side job", jId);
    try {
      const company = await fetchJobById(jId);
      console.log("my company data", company);
      if (company) setViewingCompany(company);
    } catch (error) {
      toast.error("Failed to load Jobs details ");
      // throw error;
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

  const normalizeBranch = (value) =>
    String(value || "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, " ");

  const checkStudentEligibility = (job) => {
    const studentProfile = user?.profile;
    console.log("clgpa ::",Number(studentProfile?.cgpa))

    const isEligibleCGPA =
      Number(studentProfile?.cgpa || 0) >=
      Number(job.minCgpa || job.minCGPA || 0);

    const isEligibleBranch =
      !job.allowedBranches?.length ||
      job.allowedBranches
        .map(normalizeBranch)
        .includes(normalizeBranch(studentProfile?.department));

    // const hasBacklog =
    //   String(studentProfile?.currentBacklog).toLowerCase() === "yes";
    const hasBacklog = Boolean(studentProfile?.currentBacklog);

    const isEligibleBacklog = job.backlogAllowed || !hasBacklog;
    // console.log("Student currentBacklog:", studentProfile?.currentBacklog);
    // console.log("Type:", typeof studentProfile?.currentBacklog);
    // const isEligibleBacklog =
    //   job.backlogAllowed || !studentProfile?.currentBacklog;
    console.log("Data Check : ", {
      isEligibleBacklog,
      isEligibleBranch,
      isEligibleCGPA,
    });
    return isEligibleCGPA && isEligibleBranch && isEligibleBacklog;
  };

  console.log("viewingCompany ::::::", viewingCompany);

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
          const hasApplied = studentApps.some(
            (a) => String(a.jobId) === String(job._id),
          );

          // const isEligible = checkStudentEligibility(job);
          // console.log("user profile",userMain)
          const isEligible = user?.profile
            ? checkStudentEligibility(job)
            : false;
          const deadlinePassed = job.deadline
            ? new Date() > new Date(job.deadline)
            : false;
          {
            /* {jobs.map((job) => {
          const hasApplied = studentApps.some((a) => a.jobId === job._id); */
          }

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
                      {job.jobDescription}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  disabled={hasApplied || !isEligible || deadlinePassed}
                  onClick={() => handleApply(job._id)}
                  className={`w-full px-3 py-3 rounded-xl font-black text-xs transition-all active:scale-95 shadow-xl uppercase tracking-widest ${
                    hasApplied
                      ? "bg-emerald-50 text-emerald-600 border border-emerald-100 cursor-not-allowed shadow-none"
                      : !isEligible || deadlinePassed
                        ? "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed shadow-none"
                        : "bg-[#0a0f1d] text-white hover:bg-blue-600"
                  }`}
                >
                  {hasApplied
                    ? "Verified Submission"
                    : deadlinePassed
                      ? "Deadline Passed"
                      : !isEligible
                        ? "Not Eligible"
                        : "Apply Now"}
                </button>
                {/* <button
                  disabled={hasApplied}
                  onClick={() => handleApply(job._id)}
                  className={`w-full px-3 py-3 rounded-xl font-black text-xs transition-all active:scale-95 shadow-xl uppercase tracking-widest ${
                    hasApplied
                      ? "bg-emerald-50 text-emerald-600 border border-emerald-100 cursor-not-allowed shadow-none"
                      : "bg-[#0a0f1d] text-white hover:bg-blue-600"
                  }`}
                >
                  {hasApplied ? "Verified Submission" : "Apply Now"}
                </button> */}
                <button
                  className={`w-full px-3 py-3 rounded-xl font-black text-xs transition-all active:scale-95 shadow-xl uppercase tracking-widest bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-none`}
                  onClick={() => onViewCompany(job._id)}
                >
                  View
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {viewingCompany && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-3xl ">
                  {viewingCompany.companyName?.charAt(0)}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900  tracking-tight">
                    {viewingCompany.jobTitle || viewingCompany.title}
                  </h3>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    {viewingCompany.companyName}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setViewingCompany(null)}
                className="p-2 hover:bg-slate-200 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-slate-400" />
              </button>
            </div>

            <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                      Backlog Policy
                    </p>
                    <p
                      className={`text-sm font-black ${
                        viewingCompany.backlogAllowed
                          ? "text-emerald-600"
                          : "text-rose-600"
                      }`}
                    >
                      {viewingCompany.backlogAllowed
                        ? "Backlog Allowed"
                        : "No Backlogs Allowed"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                      Industry
                    </p>
                    <p className="text-sm font-bold text-slate-900">
                      {viewingCompany?.industry || "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                      Headquarters
                    </p>
                    <p className="text-sm font-bold text-slate-900">
                      {viewingCompany.location || "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                      Minimum CGPA Required
                    </p>
                    <p className="text-sm font-black text-blue-600">
                      {viewingCompany.minCGPA ||
                        viewingCompany.minCgpa ||
                        "0.0"}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    Allowed Branches
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {viewingCompany.allowedBranches?.map((branch) => (
                      <span
                        key={branch}
                        className="text-[9px] font-black bg-slate-100 text-slate-600 px-2 py-0.5 rounded uppercase tracking-tighter"
                      >
                        {branch}
                      </span>
                    ))}
                  </div>
                </div>
                {/* <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                      Backlog Policy
                    </p>
                    <p
                      className={`text-sm font-black ${
                        viewingCompany.backlogAllowed
                          ? "text-emerald-600"
                          : "text-rose-600"
                      }`}
                    >
                      {viewingCompany.backlogAllowed
                        ? "Backlog Allowed"
                        : "No Backlogs Allowed"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                      Industry
                    </p>
                    <p className="text-sm font-bold text-slate-900 ">
                      {viewingCompany?.industry || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                      Headquarters
                    </p>
                    <p className="text-sm font-bold text-slate-900 ">
                      {viewingCompany.location || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                      Minimum CGPA Required
                    </p>
                    <p className="text-sm font-black text-blue-600 ">
                      {viewingCompany.minCGPA ||
                        viewingCompany.minCgpa ||
                        "0.0"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                      Allowed Branches
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {viewingCompany.allowedBranches?.map((branch) => (
                        <span
                          key={branch}
                          className="text-[9px] font-black bg-slate-100 text-slate-600 px-2 py-0.5 rounded uppercase tracking-tighter "
                        >
                          {branch}
                        </span>
                      ))}
                    </div>
                  </div>
                </div> */}

                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    Required Skills
                  </p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {viewingCompany.requiredSkills?.map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] font-black bg-blue-50 text-blue-600 px-3 py-1 rounded-full border border-blue-100 uppercase tracking-widest "
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200">
                  <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-3">
                    Corporate Mission (Job Description)
                  </h4>
                  <p className="text-sm text-slate-600 font-medium  leading-relaxed whitespace-pre-line">
                    {viewingCompany.jobDescription ||
                      viewingCompany.description}
                  </p>
                  {/* <div className="text-sm text-slate-600 font-medium leading-relaxed whitespace-pre-line">
                    {viewingCompany.jobDescription ||
                      viewingCompany.description}
                  </div> */}
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                      Lead Recruiter
                    </p>
                    <p className="text-sm font-bold text-slate-900 ">
                      {viewingCompany.hrName || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                      Company Website
                    </p>
                    <a
                      href={viewingCompany.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-bold text-blue-600 hover:underline  flex items-center gap-1"
                    >
                      Visit Website <Globe className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                {(() => {
                  const studentProfile = user?.profile;

                  const isEligibleCGPA =
                    Number(studentProfile?.cgpa || 0) >=
                    Number(
                      viewingCompany.minCGPA || viewingCompany.minCgpa || 0,
                    );

                  const isEligibleBranch =
                    !viewingCompany.allowedBranches?.length ||
                    viewingCompany.allowedBranches
                      .map(normalizeBranch)
                      .includes(normalizeBranch(studentProfile?.department));
                  // const isEligibleBranch =
                  //   !viewingCompany.allowedBranches?.length ||
                  //   viewingCompany.allowedBranches
                  //     .map((b) => b.toLowerCase().trim())
                  //     .includes(studentProfile?.department?.toLowerCase().trim());

                  const hasBacklog = Boolean(studentProfile?.currentBacklog);

                  const isEligibleBacklog =
                    viewingCompany.backlogAllowed || !hasBacklog;
                  // const isEligibleBacklog =
                  //   viewingCompany.backlogAllowed || !studentProfile?.currentBacklog;

                  const isEligible =
                    isEligibleCGPA && isEligibleBranch && isEligibleBacklog;

                  const hasApplied = studentApps.some(
                    (a) => String(a.jobId) === String(viewingCompany._id),
                  );

                  const deadlinePassed = viewingCompany.deadline
                    ? new Date() > new Date(viewingCompany.deadline)
                    : false;

                  let statusMessage = "";
                  let statusColor = "";
                  let reason = "";

                  if (isEligible) {
                    statusMessage = "Eligible";
                    statusColor =
                      "text-emerald-600 bg-emerald-50 border-emerald-100";
                  } else {
                    statusMessage = "Not Eligible";
                    statusColor = "text-rose-600 bg-rose-50 border-rose-100";

                    if (!isEligibleCGPA && !isEligibleBranch)
                      reason = "CGPA and Branch not eligible";
                    else if (!isEligibleCGPA) reason = "CGPA not eligible";
                    else if (!isEligibleBranch) reason = "Branch not eligible";
                    else if (!isEligibleBacklog) reason = "Backlog not allowed";
                  }

                  // let buttonText = "Apply Now";
                  // let isDisabled = !isEligible || hasApplied || deadlinePassed;
                  let buttonText = "Apply Now";
                  let isDisabled = !isEligible || hasApplied || deadlinePassed;

                  if (hasApplied) {
                    buttonText = "Already Applied";
                  } else if (deadlinePassed) {
                    buttonText = "Deadline Passed";
                  } else if (!isEligible) {
                    buttonText = "Not Eligible";
                  }
                  {
                    /* {(() => {
                  const studentProfile = user?.profile;
                  const isEligibleCGPA =
                    studentProfile?.cgpa >=
                    (viewingCompany.minCGPA || viewingCompany.minCgpa || 0);
                  const isEligibleBranch =
                    viewingCompany.allowedBranches?.includes(
                      studentProfile?.department,
                    );
                  const isEligible = isEligibleCGPA && isEligibleBranch;
                  const hasApplied = studentApps.some(
                    (a) => a.jobId === viewingCompany._id,
                  );
                  const deadlinePassed = viewingCompany.deadline
                    ? new Date() > new Date(viewingCompany.deadline)
                    : false;

                  let statusMessage = "";
                  let statusColor = "";
                  let reason = "";

                  if (isEligible) {
                    statusMessage = "Eligible";
                    statusColor =
                      "text-emerald-600 bg-emerald-50 border-emerald-100";
                  } else {
                    statusMessage = "Not Eligible";
                    statusColor = "text-rose-600 bg-rose-50 border-rose-100";
                    if (!isEligibleCGPA && !isEligibleBranch)
                      reason = "CGPA and Branch not eligible";
                    else if (!isEligibleCGPA) reason = "CGPA not eligible";
                    else if (!isEligibleBranch) reason = "Branch not eligible";
                  }

                  let buttonText = "Apply Now";
                  let isDisabled = !isEligible || hasApplied || deadlinePassed;

                  if (hasApplied) buttonText = "Already Applied";
                  else if (deadlinePassed) buttonText = "Deadline Passed";
                  else if (!isEligible) buttonText = "Not Eligible"; */
                  }

                  return (
                    <div className="space-y-4">
                      <div
                        className={`p-4 rounded-2xl border ${statusColor} flex flex-col gap-1`}
                      >
                        <div className="flex items-center gap-2">
                          {isEligible ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : (
                            <XCircle className="w-4 h-4" />
                          )}
                          <span className="text-xs font-black uppercase tracking-widest ">
                            Eligibility Status: {statusMessage}
                          </span>
                        </div>
                        {reason && (
                          <p className="text-[10px] font-bold  ml-6 opacity-80">
                            Reason: {reason}
                          </p>
                        )}
                      </div>
                      <button
                        disabled={isDisabled}
                        onClick={async () => {
                          try {
                            await handleApply(viewingCompany._id);
                            setViewingCompany(null);
                          } catch (err) {
                            console.log(err);
                          }
                        }}
                        className={`w-full py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all shadow-xl active:scale-95 ${
                          isDisabled
                            ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200 shadow-none"
                            : "bg-slate-900 text-white hover:bg-blue-600"
                        }`}
                      >
                        {buttonText}
                      </button>
                      {/* <button
                        disabled={isDisabled}
                        onClick={() => {
                          const app = {
                            id: `a${Date.now()}`,
                            jobId: viewingCompany.id,
                            jobTitle:
                              viewingCompany.jobTitle ||
                              viewingCompany.title ||
                              "",
                            studentName: user.name,
                            studentId: user.id,
                            companyId: viewingCompany.companyId,
                            companyName: viewingCompany.companyName,
                            appliedDate: new Date().toISOString().split("T")[0],
                            status: ApplicationStatus.APPLIED,
                          };
                          onUpdateApps([...applications, app]);
                          alert(
                            "Application Submitted to " +
                              viewingCompany.companyName,
                          );
                          setViewingCompany(null);
                        }}
                        className={`w-full py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all shadow-xl active:scale-95 ${
                          isDisabled
                            ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200 shadow-none"
                            : "bg-slate-900 text-white hover:bg-blue-600"
                        }`}
                      >
                        {buttonText}
                      </button> */}
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* {viewingCompany && (
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
      )} */}
    </div>
  );
};

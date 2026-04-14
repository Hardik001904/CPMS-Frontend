import {
  Award,
  CheckCircle2,
  FileText,
  Info,
  Mail,
  MapPin,
  Phone,
  Users,
  X,
  XCircle,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  fetchCompanyApplication,
  updateApplicationStatus,
} from "../../services/applicationservices";
import toast from "react-hot-toast";
import { fetchStudentById, fetchUser } from "../../services/studentService";

export const ApplicationStatus = {
  APPLIED: "Applied",
  SHORTLISTED: "Shortlisted",
  REJECTED: "Rejected",
  SELECTED: "Selected",
  ELIGIBLE: "Eligible",
  NOT_ELIGIBLE: "Not Eligible",
  BACKLOG_FOUND: "Backlog Found",
};

export default function Applicants({ refreshOverview }) {
  const [applications, setApplications] = useState([]);
  const [user, setUser] = useState([]);

  const [selectedStudent, setSelectedStudent] = useState(null);

  const getApplicationBycompany = async () => {
    try {
      const res = await fetchCompanyApplication();
      setApplications(res.application);
      // toast.success(res.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const getStudentProfile = async () => {
    try {
      const res = await fetchUser();
      setUser(res.users);
      // toast.success(res.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    getApplicationBycompany();
    getStudentProfile();
  }, []);

  const onUpdateApps = async (appId, status) => {
    try {
      console.log("onUpdateApps", { appId, status });
      const res = await updateApplicationStatus(appId, { status });
      console.log("onUpdateApps", res);
      await getApplicationBycompany();
      refreshOverview();

      toast.success(res.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <div className="space-y-6 animate-in slide-in-from-bottom-4">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-black text-slate-900  tracking-tight">
            Candidate Tracking
          </h3>
          <div className="bg-slate-900 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ">
            {applications.length} Applications Received
          </div>
        </div>

        <div className="grid gap-4">
          {applications.length === 0 ? (
            <div className="bg-white p-20 rounded-[2.5rem] border border-dashed border-slate-200 text-center">
              <Users className="w-12 h-12 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-400 font-bold ">
                No candidate submissions found yet.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Candidate
                    </th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Job Role
                    </th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      CGPA
                    </th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Backlogs
                    </th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Eligibility
                    </th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {applications?.map((app) => {
                    const student = user.find((u) => u._id === app.studentId);
                    const studentProfile = student?.profile;
                    return (
                      <tr
                        key={app._id}
                        className="hover:bg-slate-50/50 transition-colors group"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center font-black text-blue-600 text-xs ">
                              {app.studentName.charAt(0)}
                            </div>
                            <div>
                              <p className="font-black text-slate-900  text-sm">
                                {app.studentName}
                              </p>
                              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                                {studentProfile?.department || "N/A"}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-xs font-bold text-slate-600 ">
                            {app.jobTitle}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-black text-blue-600 ">
                            {studentProfile?.cgpa || "0.0"}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          {studentProfile?.currentBacklog ? (
                            <span className="text-[10px] font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded ">
                              {studentProfile.backlogCount} Backlog
                            </span>
                          ) : (
                            <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded ">
                              No Backlogs
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest border ${
                              app.status === ApplicationStatus.ELIGIBLE
                                ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                                : app.status === ApplicationStatus.NOT_ELIGIBLE
                                  ? "bg-rose-50 text-rose-600 border-rose-100"
                                  : app.status ===
                                      ApplicationStatus.BACKLOG_FOUND
                                    ? "bg-amber-50 text-amber-600 border-amber-100"
                                    : app.status === ApplicationStatus.SELECTED
                                      ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                                      : app.status ===
                                          ApplicationStatus.SHORTLISTED
                                        ? "bg-blue-50 text-blue-600 border-blue-100"
                                        : "bg-slate-50 text-slate-500 border-slate-200"
                            }`}
                          >
                            {app.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() =>
                                onUpdateApps(
                                  app._id,
                                  ApplicationStatus.SHORTLISTED,
                                )
                              }
                              className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                              title="Shortlist"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() =>
                                onUpdateApps(
                                  app._id,
                                  ApplicationStatus.SELECTED,
                                )
                              }
                              className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                              title="Final Select"
                            >
                              <Award className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() =>
                                onUpdateApps(
                                  app._id,
                                  ApplicationStatus.REJECTED,
                                )
                              }
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                              title="Reject"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (student) setSelectedStudent(student);
                              }}
                              className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all"
                              title="View Profile"
                            >
                              <Info className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      {selectedStudent && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-3xl ">
                  {selectedStudent.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900  tracking-tight">
                    {selectedStudent.name}
                  </h3>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Candidate Profile
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="p-2 hover:bg-slate-200 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-slate-400" />
              </button>
            </div>

            <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">
                    Academic Standing
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-500 ">
                        Aggregate CGPA
                      </span>
                      <span className="text-sm font-black text-blue-600 ">
                        {selectedStudent.profile.cgpa}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-500 ">
                        Department
                      </span>
                      <span className="text-sm font-black text-slate-900 ">
                        {selectedStudent.profile.department}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-500 ">
                        Batch Year
                      </span>
                      <span className="text-sm font-black text-slate-900 ">
                        {selectedStudent.profile.gradYear}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-500 ">
                        Backlogs
                      </span>
                      {selectedStudent.profile.currentBacklog ? (
                        <span className="text-xs font-black text-rose-600 ">
                          {selectedStudent.profile.backlogCount} Active
                        </span>
                      ) : (
                        <span className="text-xs font-black text-emerald-600 ">
                          None
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">
                    Contact Info
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-slate-400" />
                      <span className="text-xs font-bold text-slate-600 ">
                        {selectedStudent.email}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-slate-400" />
                      <span className="text-xs font-bold text-slate-600 ">
                        {selectedStudent.profile.phone || "Not provided"}
                      </span>
                    </div>
                    {/* <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span className="text-xs font-bold text-slate-600 ">
                        {selectedStudent.profile.location || "Not provided"}
                      </span>
                    </div> */}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">
                  Technical Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedStudent.profile.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-blue-100"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-slate-400" />
                  <div>
                    <p className="text-sm font-black text-slate-900 ">
                      Professional Resume
                    </p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ">
                      PDF Document • 2.4 MB
                    </p>
                  </div>
                </div>
                <button className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all active:scale-95">
                  Download CV
                </button>
              </div> */}
            </div>

            <div className="p-8 bg-slate-50 border-t border-slate-100 flex gap-4">
              <button
                onClick={() => {
                  const app = applications.find(
                    (a) => a.studentId === selectedStudent._id,
                  );
                  if (app)
                    
                    onUpdateApps(app._id, ApplicationStatus.SHORTLISTED);
                  setSelectedStudent(null);
                }}
                className="flex-1 bg-blue-600 text-white py-3.5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-95"
              >
                Shortlist Candidate
              </button>
              <button
                onClick={() => {
                  const app = applications.find(
                    (a) => a.studentId === selectedStudent._id,
                  );
                  if (app)
                  
                    onUpdateApps(app._id, ApplicationStatus.REJECTED);
                  setSelectedStudent(null);
                }}
                className="flex-1 bg-white border border-slate-200 text-slate-400 py-3.5 rounded-2xl font-black uppercase tracking-widest text-xs hover:text-rose-600 hover:border-rose-200 transition-all active:scale-95"
              >
                Decline Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

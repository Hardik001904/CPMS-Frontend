import { FileText } from "lucide-react";
import { getStudentApplication } from "../../services/applicationservices";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

export const ApplicationsView = () => {
  const [studentApps, setStudentApps] = useState([]);
  const getApplicationByStudent = async () => {
    try {
      const res = await getStudentApplication();
      setStudentApps(res.application);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    getApplicationByStudent();
  }, []);
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 space-y-6 animate-in slide-in-from-bottom-4">
      <div>
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Submission Archive
        </h3>
        <p className="text-slate-500 font-medium">
          Tracking your active outreach to hiring partners.
        </p>
      </div>

      {studentApps.length === 0 ? (
        <div className="bg-white rounded-[2rem] border-2 border-dashed border-slate-200 p-10 sm:p-16 text-center">
          <FileText className="w-16 h-16 text-slate-200 mx-auto mb-4" />
          <p className="text-slate-400 font-bold uppercase tracking-widest ">
            No Submission History Found
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:gap-6 w-full">
          {studentApps.map((app) => (
            <div
              key={app.id}
              className="bg-white p-5 sm:p-8 rounded-[2rem] border border-slate-200 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 w-full overflow-hidden group hover:border-blue-500 transition-all"
            >
              <div className="flex items-start sm:items-center gap-4 sm:gap-6 w-full">
                <div className="w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black text-lg sm:text-2xl group-hover:bg-blue-600 transition-colors">
                  {app.companyName.charAt(0)}
                </div>
                <div>
                  <h4 className="font-black text-lg sm:text-xl text-slate-900">
                    {app.jobTitle}
                  </h4>
                  <p className="text-sm sm:text-base text-slate-500 font-bold ">
                    {app.companyName}
                  </p>
                  <p className="text-[10px] text-slate-400 font-black uppercase mt-2 tracking-widest break-words">
                    {/* Applied: {app.appliedDate} */}
                    Applied: {new Date(app.appliedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <span
                className={`self-start sm:self-auto px-4 py-1 sm:px-5 sm:py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
                  app.status === "Selected"
                    ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                    : app.status === "Shortlisted"
                      ? "bg-blue-50 text-blue-600 border-blue-100"
                      : "bg-slate-50 text-slate-400 border-slate-100"
                }`}
              >
                {app.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

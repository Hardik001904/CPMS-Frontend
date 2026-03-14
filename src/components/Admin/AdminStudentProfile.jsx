import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchStudentProfile } from "../../services/adminService";
import { ArrowLeft } from "lucide-react";

export default function AdminStudentProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);


  useEffect(() => {
    loadStudent();
  }, []);

  const loadStudent = async () => {
    try {
      const data = await fetchStudentProfile(id);
      setStudent(data);
    } catch (error) {
      console.log("Error fetching student profile:", error);
    }
  };


  if (!student) {
    return <p className="p-6">Loading student profile...</p>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Back Button */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate("/dashboard/admin/students")}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-700 transition-all duration-200 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Students
        </button>
      </div>

      <h2 className="text-2xl font-bold text-slate-800">Student Profile</h2>

      {/* Profile Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
              Name
            </span>
            <span className="text-sm font-bold text-slate-800">
              {student.name}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
              Email
            </span>
            <span className="text-sm font-bold text-slate-800">
              {student.email}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
              Enrollment Number
            </span>
            <span className="text-sm font-bold text-slate-800">
              {student.profile?.enrollmentNumber}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
              Department
            </span>
            <span className="text-sm font-bold text-slate-800">
              {student.profile?.department}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
              CGPA
            </span>
            <span className="text-sm font-bold text-emerald-600">
              {student.profile?.cgpa}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
              Backlogs
            </span>
            <span className="text-sm font-bold text-rose-500">
              {student.profile?.backlogCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

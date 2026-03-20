import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchStudentProfile } from "../../services/adminService";
import {
  ArrowLeft,
  Mail,
  Hash,
  GraduationCap,
  Phone,
  AlertCircle,
  Award,
  BookOpen,
  BookMarked,
} from "lucide-react";

export default function AdminStudentProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) loadStudent();
  }, [id]);

  const loadStudent = async () => {
    try {
      setLoading(true);
      const data = await fetchStudentProfile(id);
      setStudent(data);
    } catch (error) {
      console.error("Error fetching student:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 shadow-sm">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-slate-900">Student Not Found</h3>
        <button
          onClick={() => navigate("/dashboard/admin/students")}
          className="mt-4 px-6 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800"
        >
          Back to Students
        </button>
      </div>
    );
  }

  const profile = student.profile || {};

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/dashboard/admin/students")}
          className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div>
          <h2 className="text-2xl font-bold text-slate-900">Student Profile</h2>
          <p className="text-sm text-slate-500">
            Academic and personal information
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Card */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-center">
          <div className="w-24 h-24 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-3xl font-bold text-slate-500">
            {student.name?.charAt(0)}
          </div>

          <h3 className="mt-4 text-xl font-bold text-slate-800">
            {student.name}
          </h3>

          <p className="text-sm text-slate-500">
            {profile.department || "Department Not Assigned"}
          </p>

          <div className="mt-6 space-y-3 text-left">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Mail className="w-4 h-4" />
              {student.email}
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Hash className="w-4 h-4" />
              {profile.enrollmentNumber || "N/A"}
            </div>

            {profile.phone && (
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Phone className="w-4 h-4" />
                {profile.phone}
              </div>
            )}
          </div>
        </div>

        {/* Academic Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-slate-800">Academic Information</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-slate-400 uppercase">
                  Enrollment Number
                </p>
                <p className="font-semibold text-slate-700">
                  {profile.enrollmentNumber || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400 uppercase">Department</p>
                <p className="font-semibold text-slate-700">
                  {profile.department || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400 uppercase">CGPA</p>
                <p className="font-semibold text-emerald-600">
                  {profile.cgpa || "0.0"}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400 uppercase">Backlogs</p>
                <p className="font-semibold text-rose-500">
                  {profile.backlogCount || "0"}
                </p>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <Award className="w-5 h-5 text-indigo-600" />
              <h3 className="font-bold text-slate-800">Skills</h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {profile.skills && profile.skills.length > 0 ? (
                profile.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-xs bg-slate-100 rounded-md"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-sm text-slate-400">No skills added</p>
              )}
            </div>
          </div>

          {/* Resume */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex justify-between items-center">
            <div>
              <p className="text-xs text-slate-400 uppercase">Resume</p>
              <p className="text-sm text-slate-500">View uploaded resume</p>
            </div>

            {profile.resumeUrl ? (
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
              >
                <BookMarked className="w-4 h-4" />
                View Resume
              </a>
            ) : (
              <span className="text-sm text-slate-400">No Resume Uploaded</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

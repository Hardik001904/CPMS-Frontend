import { Eye } from "lucide-react";
import React, { useEffect, useState } from "react";
import { fetchStudents } from "../../services/adminService";
import { useNavigate } from "react-router-dom";

export default function StudentDirectory() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  const loadstudents = async () => {
    try {
      const data = await fetchStudents();
      console.log("data", data);
      setStudents(data);
    } catch (error) {
      console.log("Failed to fetch students", error);
    }
  };

  useEffect(() => {
    loadstudents();
  }, []);

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">

      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-black text-slate-900 tracking-tight">
          Student Directory
        </h3>

        <div className="bg-blue-600/10 text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
          {students.length} Students
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left">

          {/* Table Head */}
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Candidate
              </th>

              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Enrollment
              </th>

              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Department
              </th>

              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">
                Action
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-50">
            {students.length > 0 ? (
              students.map((s) => (
                <tr
                  key={s._id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-900">{s.name}</p>
                    <p className="text-xs text-slate-500">{s.email}</p>
                  </td>

                  <td className="px-6 py-4 text-xs font-black text-slate-600 tracking-wider">
                    {s.profile?.enrollmentNumber || "N/A"}
                  </td>

                  <td className="px-6 py-4 text-xs font-bold text-slate-500">
                    {s.profile?.department || "Unassigned"}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() =>
                        navigate(`/dashboard/admin/students/${s._id}`)
                      }
                      className="p-2 text-slate-300 hover:text-blue-500 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-8 text-sm text-slate-400"
                >
                  No students found
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}










// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   ArrowLeft,
//   Mail,
//   Hash,
//   BookOpen,
//   AlertCircle,
//   Phone,
//   Award,
//   BookMarked,
// } from "lucide-react";
// import { fetchStudentProfile } from "../../services/adminService";

// export default function AdminStudentProfile() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [student, setStudent] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!id) {
//       console.log("❌ ID is missing");
//       setLoading(false);
//       return;
//     }

//     loadStudent();
//   }, [id]);

//   const loadStudent = async () => {
//     try {
//       console.log("Fetching student ID:", id);
//       setLoading(true);

//       const res = await fetchStudentProfile(id);

//       console.log("API RESPONSE:", res);

//       // ✅ HANDLE DIFFERENT RESPONSE STRUCTURES
//       const studentData = res?.data || res;

//       setStudent(studentData);
//     } catch (error) {
//       console.error("❌ Error fetching student:", error);
//       setStudent(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔄 Loading
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   // ❌ Not Found
//   if (!student) {
//     return (
//       <div className="p-8 text-center bg-white rounded-xl shadow">
//         <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
//         <h3 className="text-xl font-bold">Student Not Found</h3>

//         <button
//           onClick={() => navigate("/dashboard/admin/students")}
//           className="mt-4 px-4 py-2 bg-black text-white rounded"
//         >
//           Back
//         </button>
//       </div>
//     );
//   }

//   const profile = student?.profile || {};

//   return (
//     <div className="space-y-6 p-6">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <button
//           onClick={() => navigate("/dashboard/admin/students")}
//           className="flex items-center gap-2"
//         >
//           <ArrowLeft /> Back
//         </button>

//         <span className="px-3 py-1 bg-gray-200 rounded text-sm">
//           {student.status}
//         </span>
//       </div>

//       {/* Left Card */}
//       <div className="bg-white p-6 rounded shadow text-center">
//         <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center text-3xl font-bold">
//           {student.name?.charAt(0)}
//         </div>

//         <h3 className="mt-4 text-xl font-bold">{student.name}</h3>
//         <p className="text-gray-500">{profile.department || "N/A"}</p>

//         <div className="mt-4 space-y-2 text-left">
//           <div className="flex gap-2">
//             <Mail className="w-4 h-4" />
//             {student.email}
//           </div>

//           <div className="flex gap-2">
//             <Hash className="w-4 h-4" />
//             {profile.enrollmentNumber || "N/A"}
//           </div>

//           {profile.phone && (
//             <div className="flex gap-2">
//               <Phone className="w-4 h-4" />
//               {profile.phone}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Academic */}
//       <div className="bg-white p-6 rounded shadow">
//         <h3 className="font-bold mb-2 flex items-center gap-2">
//           <BookOpen /> Academic Info
//         </h3>

//         <p>CGPA: {profile.cgpa || "0.0"}</p>
//         <p>Backlogs: {profile.backlogCount || "0"}</p>
//         <p>University: {profile.university || "N/A"}</p>
//       </div>

//       {/* Skills */}
//       <div className="bg-white p-6 rounded shadow">
//         <h3 className="font-bold mb-2 flex items-center gap-2">
//           <Award /> Skills
//         </h3>

//         <div className="flex flex-wrap gap-2">
//           {profile.skills?.length > 0 ? (
//             profile.skills.map((skill, index) => (
//               <span key={index} className="bg-gray-100 px-3 py-1 rounded">
//                 {skill}
//               </span>
//             ))
//           ) : (
//             <p>No skills</p>
//           )}
//         </div>
//       </div>

//       {/* Resume */}
//       <div className="bg-white p-6 rounded shadow flex justify-between items-center">
//         <span>Resume</span>

//         {profile.resumeUrl ? (
//           <a
//             href={profile.resumeUrl}
//             target="_blank"
//             rel="noreferrer"
//             className="bg-blue-600 text-white px-4 py-2 rounded"
//           >
//             View Resume
//           </a>
//         ) : (
//           <span>No Resume</span>
//         )}
//       </div>
//     </div>
//   );
// }




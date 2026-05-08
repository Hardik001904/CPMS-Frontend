import React, { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Trash2,
  FileUp,
  GraduationCap,
  Hash,
  BookOpen,
  AlertCircle,
  CheckCircle2,
  X,
} from "lucide-react";
import {
  addMasterStudent,
  deleteMasterStudent,
  getMasterStudents,
} from "../../services/adminService";
import { AnimatePresence, motion } from "framer-motion";

export default function MasterStudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: "",
    enrollmentNumber: "",
    department: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      setLoading(true);
      const data = await getMasterStudents();
      setStudents(data.students);
    } catch (error) {
      console.error("Error loading master students:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await addMasterStudent({
        name: newStudent.name.trim(),

        enrollmentNumber: newStudent.enrollmentNumber.trim(),
        department: newStudent.department.trim(),
      });
      setSuccess("Student added successfully!");
      setNewStudent({ name: "", enrollmentNumber: "", department: "" });
      setTimeout(() => setShowAddModal(false), 1500);
      loadStudents();
    } catch (err) {
      console.log("ERROR:", err.response?.data);
      setError(err.message || "Failed to add student");
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to remove this student from the master list?",
      )
    )
      return;
    try {
      await deleteMasterStudent(id);
      loadStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.enrollmentNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.department.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl md:text-2xl font-black text-slate-900  tracking-tight">
            Master Student List
          </h3>
          <p className="text-slate-500 font-medium text-sm">
            Manage the authoritative list of eligible students.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 active:scale-95"
          >
            <Plus className="w-4 h-4" /> Add Student
          </button>
        </div>
      </div>

      {/* Search & Stats */}
      <div className=" grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 relative">
          <Search className="absolute left-6 top-4.5  w-5 h-5 text-slate-400" />
          <input
            type="search"
            placeholder="Search by name, enrollment, or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-16 pr-6 py-4 bg-white border border-slate-200 rounded-[2rem] text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/5 transition-all shadow-sm"
          />
        </div>
        <div className="bg-blue-600  rounded-[2rem] text-white flex flex-col items-center justify-center shadow-lg shadow-blue-600/20">
          <p className="text-[10px] font-black uppercase tracking-widest opacity-80">
            Total Students
          </p>
          <p className="text-xl font-black ">{students.length}</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-4 md:px-8 py-4 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Student Details
                </th>
                <th className="px-4 md:px-8 py-4 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Enrollment No.
                </th>
                <th className="px-4 md:px-8 py-4 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Department
                </th>
                <th className="px-4 md:px-8 py-4 md:py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-4 md:px-8 py-12 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  </td>
                </tr>
              ) : filteredStudents.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 md:px-8 py-12 text-center text-slate-400 font-medium "
                  >
                    No students found in the master list.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr
                    key={student._id}
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="px-4 md:px-8 py-4 md:py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 font-black text-sm ">
                          {student.name.charAt(0)}
                        </div>
                        <span className="text-sm font-black text-slate-900 tracking-tight">
                          {student.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 md:px-8 py-4 md:py-6">
                      <span className="text-xs font-bold text-slate-500 font-mono">
                        {student.enrollmentNumber}
                      </span>
                    </td>
                    <td className="px-4 md:px-8 py-4 md:py-6">
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-wider">
                        {student.department}
                      </span>
                    </td>
                    <td className="px-4 md:px-8 py-4 md:py-6 text-right">
                      <button
                        onClick={() => handleDelete(student._id)}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden"
            >
              <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                <h4 className="text-xl font-black text-slate-900  tracking-tight">
                  Add New Student
                </h4>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-slate-50 rounded-xl transition-all"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <form onSubmit={handleAddStudent} className="p-8 space-y-6">
                {error && (
                  <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-600 text-xs font-bold">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {error}
                  </div>
                )}
                {success && (
                  <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3 text-emerald-600 text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    {success}
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={newStudent.name}
                      onChange={(e) =>
                        setNewStudent({ ...newStudent, name: e.target.value })
                      }
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                      placeholder="e.g. John Doe"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    Enrollment Number
                  </label>
                  <div className="relative">
                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={newStudent.enrollmentNumber}
                      onChange={(e) =>
                        setNewStudent({
                          ...newStudent,
                          enrollmentNumber: e.target.value,
                        })
                      }
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                      placeholder="e.g. EN123456"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    Department
                  </label>
                  <div className="relative">
                    <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={newStudent.department}
                      onChange={(e) =>
                        setNewStudent({
                          ...newStudent,
                          department: e.target.value,
                        })
                      }
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                      placeholder="e.g. Computer Science"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 active:scale-[0.98]"
                >
                  Add to Master List
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

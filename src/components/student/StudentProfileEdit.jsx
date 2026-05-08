import { useEffect, useState } from "react";
import { Globe, Hash, Phone, Plus, Save, X } from "lucide-react";
import { useFormik } from "formik";
import {
  fetchStudentById,
  updateStudentProfile,
} from "../../services/studentService";
import { array, number, object, string } from "yup";
import toast from "react-hot-toast";

export const StudentProfileEdit = ({ profile }) => {
  const [local, setLocal] = useState(profile);
  const [skillsInput, setSkillsInput] = useState(profile.skills.join(", "));
  const DEPARTMENTS = [
    "Computer Science & Engineering",
    "Information Technology",
    "Electronics & Communication",
    "Mechanical Engineering",
    "Electrical Engineering",
    "Civil Engineering",
  ];

  const [user, setUser] = useState({});
  useEffect(() => {
    getStudent();
  }, []);

  const [newSkill, setNewSkill] = useState("");

  const handleRemoveSkill = (skillToRemove) => {
    setLocal({
      ...local,
      skills: local.skills.filter((s) => s !== skillToRemove),
    });
  };

  const getStudent = async () => {
    try {
      const res = await fetchStudentById();
      setUser(res?.user);
    } catch (error) {
      console.log(error);
    }
  };

  const userValidationSchema = object({
    cgpa: string().required("CGPA is required"),
    skills: array().min(1, "At least one skill is required"),
    resumeUrl: string().required("ResumeUrl is required"),
    phone: string().required("Phone Number is required"),
    backlogCount: number()
      .min(0, "Backlog cannot be negative")
      .max(10, "Backlog cannot exceed 10")
      .required("Backlog count is required"),
  });

  const {
    handleSubmit,
    handleChange,
    errors,
    values,
    touched,
    setFieldValue,
    handleBlur,
  } = useFormik({
    enableReinitialize: true,
    initialValues: {
      cgpa: user.profile?.cgpa || "",
      skills: user.profile?.skills || [],
      resumeUrl: user.profile?.resumeUrl || "",
      phone: user.profile?.phone || "",
      enrollmentNumber: user.profile?.enrollmentNumber || "",
      department: user?.profile?.department || "",
      backlogCount: user?.profile?.backlogCount || 0,
      currentBacklog: user?.profile?.currentBacklog || false,
    },
    validationSchema: userValidationSchema,
    onSubmit: async (values) => {
      try {
        const res = await updateStudentProfile(values);
        toast.success("Profile updated successfully");
      } catch (error) {
        console.log("Error message:", error.message);
        toast.error(error.message);
      }
    },
  });

  const handleAddSkill = () => {
    if (!newSkill.trim()) return;

    if (!values.skills.includes(newSkill.trim())) {
      setFieldValue("skills", [...values.skills, newSkill.trim()]);
    }

    setNewSkill("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="max-w-6xl mx-auto px-4 md:px-0 space-y-8 md:space-y-12 animate-in fade-in duration-700 pb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 md:p-10 rounded-2xl md:rounded-[3rem] border border-slate-200 shadow-sm gap-6">
          <div>
            <h3 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tighter  underline decoration-blue-600 decoration-[6px] underline-offset-8">
              Academic Persona
            </h3>
            <p className="text-slate-400 font-black mt-3 uppercase tracking-[0.2em] text-[10px]">
              Institutional Identity Synchronization
            </p>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white w-full md:w-auto px-6 md:px-12 py-3 md:py-5 rounded-2xl font-black shadow-2xl shadow-blue-600/30 hover:bg-blue-500 transition-all flex items-center gap-3 active:scale-95 uppercase tracking-widest text-sm"
          >
            <Save className="w-5 h-5" />
            {/* Finalize Record */} Update Profile
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Identity Matrix */}
          <div className="bg-white p-6 md:p-12 rounded-2xl md:rounded-[3.5rem] border border-slate-200 space-y-8 shadow-sm hover:shadow-xl transition-all">
            <h4 className="text-[10px] font-black text-slate-900 flex items-center gap-3 uppercase tracking-[0.3em]">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" /> Identity
              Matrix
            </h4>
            <div className="space-y-6">
              <div>
                <label className="text-[10px]  font-black text-slate-400 uppercase tracking-widest  block mb-2">
                  Institutional Department
                </label>
                <input
                  value={values.department}
                  className="w-full  p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold focus:ring-4 focus:ring-blue-500/5 outline-none cursor-not-allowed appearance-none"
                />
                {touched.department && errors.department ? (
                  <p>{errors.department}</p>
                ) : null}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">
                    Campus ID
                  </label>
                  <div className="relative">
                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      name="enrollmentNumber"
                      value={values.enrollmentNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold focus:ring-4 focus:ring-blue-500/5 cursor-not-allowed outline-none"
                      placeholder="TIT/2026/001"
                    />
                    {touched.enrollmentNumber && errors.enrollmentNumber ? (
                      <p>{errors.enrollmentNumber}</p>
                    ) : null}
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">
                    Phone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      name="phone"
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold focus:ring-4 focus:ring-blue-500/5 outline-none"
                      placeholder="+91 XXXXX XXXXX"
                    />
                    {touched.phone && errors.phone ? (
                      <p>{errors.phone}</p>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Digital Presence */}
          <div className="bg-white p-6 md:p-12 rounded-2xl md:rounded-[3.5rem] border border-slate-200 space-y-8 shadow-sm hover:shadow-xl transition-all">
            <h4 className="text-[10px] font-black text-slate-900 flex items-center gap-3 uppercase tracking-[0.3em]">
              <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full" /> Digital
              Portfolio
            </h4>
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">
                  Portfolio / Website Link
                </label>
                <div className="relative">
                  <Globe className="absolute left-4 top-5.5 w-4 h-4 text-slate-400" />
                  <input
                    name="resumeUrl"
                    type="url"
                    value={values.resumeUrl}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold focus:ring-4 focus:ring-blue-500/5 outline-none"
                    placeholder="https://portfolio.ai/"
                  />
                  {touched.resumeUrl && errors.resumeUrl ? (
                    <p>{errors.resumeUrl}</p>
                  ) : null}
                </div>
              </div>
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 border-dashed">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                  Live Endpoint
                </p>
                <p className="font-bold text-blue-600 truncate">
                  {local.website || "Awaiting synchronization..."}
                </p>
              </div>
            </div>
          </div>

          {/* Academic Status */}
          <div className="bg-white p-6 md:p-12 rounded-2xl md:rounded-[3.5rem] border border-slate-200 space-y-8 shadow-sm hover:shadow-xl transition-all">
            <h4 className="text-[10px] font-black text-slate-900 flex items-center gap-3 uppercase tracking-[0.3em]">
              <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full" />{" "}
              Performance Stats
            </h4>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-emerald-50/50 p-6 rounded-3xl border border-emerald-100">
                <label className="text-[9px] font-black text-emerald-600/50 uppercase tracking-widest block mb-3">
                  Aggregate CGPA
                </label>
                <input
                  name="cgpa"
                  value={values.cgpa}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full bg-transparent text-emerald-600 font-black text-2xl md:text-4xl tracking-tighter outline-none"
                  placeholder="0.0"
                />
                {touched.cgpa && errors.cgpa ? <p>{errors.cgpa}</p> : null}
              </div>
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-3 text-center">
                  Batch Of
                </label>
                <input
                  name="batch of"
                  value={values.gradYear}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full bg-transparent text-slate-900 font-black text-4xl text-center outline-none"
                  placeholder="2026"
                />
                {touched.batch && errors.batch ? <p>{errors.batch}</p> : null}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1.5 ml-1">
                  Backlog Count
                </label>
                <input
                  type="number"
                  name="backlogCount"
                  min="0"
                  max="10"
                  value={values.backlogCount || 0}
                  onKeyDown={(e) => {
                    if (e.key === "-" || e.key === "e") {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => {
                    let count = parseInt(e.target.value) || 0;
                    if (count > 10) count = 10;
                    if (count < 0) count = 0;

                    setFieldValue("backlogCount", count);
                    setFieldValue("currentBacklog", count > 0);
                  }}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/10 font-black text-sm  text-rose-600"
                />
                {touched.backlogCount && errors.backlogCount && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.backlogCount}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-3 pt-6">
                <input
                  type="checkbox"
                  name="currentBacklog"
                  checked={values.currentBacklog}
                  onChange={(e) =>
                    setFieldValue("currentBacklog", e.target.checked)
                  }
                  id="profileBacklog"
                  className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor="profileBacklog"
                  className="text-[9px] font-black text-slate-400 uppercase tracking-widest cursor-pointer"
                >
                  Has Active Backlog
                </label>
              </div>
            </div>
          </div>

          {/* Skill Inventory */}
          <div className=" bg-white p-6 md:p-12 rounded-2xl md:rounded-[3.5rem] border border-slate-200 space-y-8 shadow-sm hover:shadow-xl transition-all">
            <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-4">
              Skill Repository
            </h4>

            <div className="space-y-6">
              {/* Add Skill Input */}
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddSkill();
                    }
                  }}
                  className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/10 font-bold text-sm "
                  placeholder="e.g. React, Python, Cloud Architecture..."
                />

                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="bg-slate-900 text-white w-full sm:w-auto px-6 py-3 rounded-xl font-black shadow-lg hover:bg-slate-800 transition-all flex items-center gap-2 active:scale-95 uppercase tracking-widest text-[10px]"
                >
                  <Plus className="w-4 h-4" /> Add Skill
                </button>
              </div>

              {/* Skill List */}
              <div className="flex flex-wrap gap-2 max-w-full">
                {values.skills.length === 0 ? (
                  <p className="text-xs text-slate-400 font-medium ">
                    No skills added yet. Showcase your technical strengths.
                  </p>
                ) : (
                  values.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-xl border border-blue-100 transition-all group hover:border-blue-300"
                    >
                      <span className="text-[11px] font-black uppercase tracking-widest">
                        {skill}
                      </span>

                      <button
                        type="button"
                        onClick={() => {
                          const updatedSkills = values.skills.filter(
                            (_, i) => i !== index,
                          );
                          setFieldValue("skills", updatedSkills);
                        }}
                        className="p-0.5 hover:bg-blue-100 rounded text-blue-400 hover:text-blue-700 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

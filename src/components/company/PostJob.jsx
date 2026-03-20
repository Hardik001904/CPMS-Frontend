import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { object, string } from "yup";
import toast from "react-hot-toast";
import { postJobs } from "../../services/companyService";

const jobValidationSchema = object({
  title: string().required("Title is required"),
  location: string().required("Location is required"),
  salary: string().required("Salary is required"),
  description: string().required("Description is required"),
  minCgpa: string().required("Minimum CGPA is required"),
  allowedBranches: string().required("Branches are required"),
  requiredSkills: string().required("Skills are required"),

});

export default function PostJob() {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));

  const { handleSubmit, handleChange, errors, touched, values, handleBlur } =
    useFormik({
      initialValues: {
        title: "",
        location: "",
        salary: "",
        minCgpa: "",
        allowedBranches: "",
        requiredSkills: "",
        description: "",
        status: "Open",
      },
      onSubmit: async (values) => {
        try {
          console.log("user : ", user);
          console.log("values : ", values);
          const jobData = {
            ...values,
            companyId: user?._id,
            companyName: user?.name,
            postedDate: new Date().toISOString().split("T")[0],
          };

          console.log("jobData", jobData);
          const res = await postJobs(jobData);
          toast.success("Job Posted Successfully");
          navigate("/dashboard/company/my-jobs");
        } catch (error) {
          toast.error(error.response?.data?.message || "Something went wrong");
        }
      },
    });

  return (
    <div className="max-w-3xl  space-y-6 animate-in slide-in-from-bottom-4 ">
      <h3 className="text-2xl font-black text-slate-900  tracking-tight">
        Post New Requirement
      </h3>
      <div className="bg-white p-10 rounded-[2.5rem]  border border-slate-200 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                Role Title
              </label>
              <input
                name="title"
                required
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/10 font-bold "
                placeholder="Software Engineer II"
              />
              {touched.title && errors.title ? <p>{errors.title}</p> : null}
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                Location
              </label>
              <input
                name="location"
                required
                value={values.location}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/10 font-bold "
                placeholder="Hybrid / Remote"
              />
              {touched.location && errors.location ? (
                <p>{errors.location}</p>
              ) : null}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
              Compensation Range
            </label>
            <input
              name="salary"
              required
              value={values.salary}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/10 font-black  text-emerald-600"
              placeholder="$120k - $150k"
            />
            {touched.salary && errors.salary ? <p>{errors.salary}</p> : null}
          </div>
          <div className="space-y-4 p-6 bg-slate-50 rounded-3xl border border-slate-200">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
              Eligibility Requirements
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                  Min CGPA
                </label>
                <input
                  name="minCgpa"
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  defaultValue="7.0"
                  placeholder="Minimum CGPA"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onWheel={(e) => e.target.blur()}
                  className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/10 font-black "
                />
                {touched.minCgpa && errors.minCgpa ? (
                  <p>{errors.minCgpa}</p>
                ) : null}
              </div>
              <div className="flex items-center gap-3 pt-8">
                <input
                  name="backlogAllowed"
                  type="checkbox"
                  id="backlogAllowed"
                  className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor="backlogAllowed"
                  className="text-[10px] font-black text-slate-500 uppercase tracking-widest cursor-pointer"
                >
                  Backlogs Allowed
                </label>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                Allowed Branches (Comma separated)
              </label>
              <input
                name="allowedBranches"
                className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/10 font-bold "
                placeholder="CE, IT, ECE"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                Required Skills (Comma separated)
              </label>
              <input
                name="requiredSkills"
                className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/10 font-bold "
                placeholder="React, Node.js, Python"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
              Job Description
            </label>
            <textarea
              name="description"
              required
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              rows={4}
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/10 font-medium "
              placeholder="Outline core responsibilities..."
            />
            {touched.description && errors.description ? (
              <p>{errors.description}</p>
            ) : null}
          </div>
          <button
            type="submit"
            className="w-full bg-slate-900 hover:bg-blue-600 text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] transition-all shadow-xl active:scale-95"
          >
            Publish Opening
          </button>
        </form>
      </div>
    </div>
  );
}

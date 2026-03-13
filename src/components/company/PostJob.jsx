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

  // criteria: string().required("Criteria is required"),
});

export default function PostJob() {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));
  // console.log("user : ", user);

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
      // validationSchema: jobValidationSchema,
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
    // <div className="max-w-3xl mx-auto space-y-6 animate-in slide-in-from-bottom-4 ">
    <div className="max-w-3xl  space-y-6 animate-in slide-in-from-bottom-4 ">
      <h3 className="text-2xl font-black text-slate-900  tracking-tight">
        Post New Requirement
      </h3>
      <div className="bg-white p-10 rounded-[2.5rem]  border border-slate-200 shadow-sm">
        {/* <div >
          <h3 className="text-3xl font-black text-slate-900  mb-10 tracking-tight">
        Post New Requirement
      </h3>
      </div> */}
        {/* onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const newJob = {
              id: "j" + Date.now(),
              title: formData.get("title"),
              companyId: user.id,
              companyName: user.name,
              location: formData.get("location"),
              salary: formData.get("salary"),
              description: formData.get("description"),
              criteria: formData.get("criteria"),
              postedDate: new Date().toISOString().split("T")[0],
              status: "Open",
            };
            onUpdateJobs([...jobs, newJob]);
            alert("Job Posted Successfully!");
            navigate("/dashboard/company/my-jobs");
          }} */}
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
          {/* <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
              Eligibility Criteria
            </label>
            <textarea
              name="criteria"
              required
              value={values.criteria}
              onChange={handleChange}
              onBlur={handleBlur}
              rows={2}
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/10 font-medium "
              placeholder="CGPA > 8.0, CS/IT only..."
            />

            {touched.criteria && errors.criteria ? (
              <p>{errors.criteria}</p>
            ) : null}
          </div> */}
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

// import React, { useState } from "react";

// export default function PostJob() {
//   const [newJob, setNewJob] = useState({
//     title: "",
//     salary: "",
//     location: "",
//     criteria: "",
//     description: "",
//   });

//   const handlePost = (e) => {
//     e.preventDefault();
//     const job = {
//       id: `job_${Date.now()}`,
//       ...newJob,
//       companyId: user.id,
//       companyName: user.name,
//       postedDate: new Date().toISOString().split("T")[0],
//       status: "Open",
//     };
//     onUpdateJobs([...jobs, job]);
//     setNewJob({
//       title: "",
//       salary: "",
//       location: "",
//       criteria: "",
//       description: "",
//     });
//     navigate("/dashboard/company/my-jobs");
//     alert("Hiring Requirement Published Successfully!");
//   };
//   return (
//     <div className="max-w-3xl bg-white p-10 md:p-14 rounded-[3rem] border border-slate-200 shadow-sm animate-in slide-in-from-bottom-8 duration-700">
//       <div className="mb-10">
//         <h3 className="text-3xl font-black text-slate-900 italic tracking-tight">
//           Broadcast Mandate
//         </h3>
//         <p className="text-slate-500 font-medium mt-2">
//           Formalizing corporate outreach for technical talent acquisition.
//         </p>
//       </div>
//       <form onSubmit={handlePost} className="space-y-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           <div className="md:col-span-2">
//             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">
//               Mandate Designation
//             </label>
//             <input
//               required
//               value={newJob.title}
//               onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
//               className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold focus:ring-4 focus:ring-blue-500/5 outline-none"
//               placeholder="e.g. Platform Engineer"
//             />
//           </div>
//           <div>
//             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">
//               Compensation Range
//             </label>
//             <input
//               required
//               value={newJob.salary}
//               onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
//               className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold focus:ring-4 focus:ring-blue-500/5 outline-none"
//               placeholder="$140k - $180k"
//             />
//           </div>
//           <div>
//             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">
//               Deployment HQ
//             </label>
//             <input
//               required
//               value={newJob.location}
//               onChange={(e) =>
//                 setNewJob({ ...newJob, location: e.target.value })
//               }
//               className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold focus:ring-4 focus:ring-blue-500/5 outline-none"
//               placeholder="Hybrid / Remote"
//             />
//           </div>
//           <div className="md:col-span-2">
//             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">
//               Scope of Responsibility
//             </label>
//             <textarea
//               required
//               rows={6}
//               value={newJob.description}
//               onChange={(e) =>
//                 setNewJob({
//                   ...newJob,
//                   description: e.target.value,
//                 })
//               }
//               className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold focus:ring-4 focus:ring-blue-500/5 outline-none resize-none"
//               placeholder="Describe the impact of this role..."
//             ></textarea>
//           </div>
//         </div>
//         <button
//           type="submit"
//           className="w-full py-5 bg-[#0a0f1d] text-white rounded-2xl font-black text-lg shadow-2xl hover:bg-blue-600 active:scale-95 transition-all uppercase tracking-widest"
//         >
//           Broadcast Mandate
//         </button>
//       </form>
//     </div>
//   );
// }

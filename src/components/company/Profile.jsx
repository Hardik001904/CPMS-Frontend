import { useFormik } from "formik";
import { Save } from "lucide-react";
import React, { useEffect, useState } from "react";
import { updateMyprofile } from "../../services/companyService";
import { object, string } from "yup";
import toast from "react-hot-toast";
import { fetchUserById } from "../../services/authService";

export default function Profile({
  user,
  // profile = {},
  allUsers = [],
  onUpdateUser,
}) {
  // const  profile = {
  //   description:"we are looking for dedicated developer who can real world problem",
  //   location:"Ahmedabad",
  //   size:"1000+ Employees"
  // }

  const userValidationSchema = object({
    description: string().required("Description is required"),
    location: string().required("Location is required"),
    size: string().required("Size is required"),
  });

  // const [profile, setProfile] = useState();
  // useEffect(() => {

  // },[]);

  const [profile, setProfile] = useState({});
  useEffect(() => {
    getCompany();
  }, []);

  const getCompany = async () => {
    try {
      const res = await fetchUserById();
      // console.log("inside API Response:", res?.user?.profile);
      setProfile(res?.user?.profile);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log("outside", profile.description);

  const { handleSubmit, handleChange, errors, touched, values, handleBlur } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        description: profile?.description || "",
        location: profile?.location || "",
        size: profile?.size || "",
      },
      validationSchema: userValidationSchema,
      onSubmit: async (values) => {
        console.log(values);
        try {
          console.log(values);

          const res = await updateMyprofile(values);
          console.log("inside ", res.data);
          toast.success("Profile updated successfully");
        } catch (error) {
          console.log("Error message:", error.message);
          toast.error(error.message);
        }
      },
    });
  return (
    <form onSubmit={handleSubmit}>
      <div className="max-w-4xl space-y-8 animate-in fade-in duration-700">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 flex justify-between items-center shadow-sm">
          <div>
            <h3 className="text-2xl font-black text-slate-900  tracking-tight">
              Corporate Profile
            </h3>
            <p className="text-xs text-slate-500 font-medium ">
              Industry verification details
            </p>
          </div>
          <button
            type="submit"
            // onClick={() => handleSubmit()}
            // onUpdateUser(
            //   allUsers.map((u) => (u.id === user.id ? { ...u, profile } : u)),
            // );
            // alert("Company Profile Updated!");
            // }}
            className="bg-slate-900 text-white px-8 py-3 rounded-xl font-black shadow-lg hover:bg-blue-600 transition-all flex items-center gap-2 active:scale-95 uppercase tracking-[0.2em] text-[10px]"
          >
            <Save className="w-4 h-4" /> Update Identity
          </button>
        </div>
        {/* Visual Placeholder for more profile fields if needed */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 space-y-4">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
              Org Description
            </label>
            <textarea
              name="description"
              value={values.description}
              // defaultValue={profile.description}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/10 font-medium  h-32"
              placeholder="Tell us about your company..."
            />
            {touched.description && errors.description ? (
              <p>{errors.description}</p>
            ) : null}
          </div>
          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 space-y-4">
            {/* <div className="bg-white p-8 rounded-[2rem] border border-slate-200 space-y-4"> */}
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
              Headquarters
            </label>
            <input
              name="location"
              value={values.location}
              // defaultValue={profile.location}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/10 font-bold "
              placeholder="e.g. San Francisco, CA"
            />
            {touched.location && errors.location ? (
              <p>{errors.location}</p>
            ) : null}
            {/* <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mt-2 block">
              Organization Size
            </label> */}

            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mt-2 block">
              Organization Size
            </label>

            <select
              name="size"
              value={values.size}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/10 font-bold italic appearance-none"
            >
              <option value="">Select size</option>
              <option value="1-50 Employees">1-50 Employees</option>
              <option value="51-200 Employees">51-200 Employees</option>
              <option value="201-1000 Employees">201-1000 Employees</option>
              <option value="1000+ Employees">1000+ Employees</option>
            </select>

            {touched.size && errors.size && (
              <p className="text-red-500 text-xs">{errors.size}</p>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Building2,
  Mail,
  Lock,
  Globe,
  User as UserIcon,
  Briefcase,
  Eye,
  EyeOff,
} from "lucide-react";
import { appLogo, AppLogo, appName } from "../App";
import { object, string } from "yup";
import { useFormik } from "formik";
import { registercompany } from "../services/authService";
import toast from "react-hot-toast";

const userValidationSchema = object({
  name: string().required("Name is required"),
  email: string().email("Invalid email").required("Email is required"),
  password: string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
  website: string().url().required("Website url is required"),
  hrName: string().required("HR Name is required"),
  industry: string().required("Indusrty Type is required"),
});

const CompanyRegister = ({ allUsers, onUpdateUsers }) => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const { handleSubmit, handleChange, errors, touched, handleBlur } = useFormik(
    {
      initialValues: {
        name: "",
        email: "",
        password: "",
        website: "",
        industry: "",
        hrName: "",
      },

      validationSchema: userValidationSchema,
      onSubmit: async (values) => {
        try {
          const res = await registercompany(values);
          toast.success("Register successfully");
          navigate("/login");
        } catch (error) {
          console.log("Error message:", err.message);
          toast.error(err.message);
        }
      },
    },
  );

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
      <div className="max-w-md w-full py-12">
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-xl">
              {appLogo}
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">
              {appName}
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Corporate Partnership
          </h1>
          <p className="text-slate-400 mt-2">
            Access the elite student talent pool
          </p>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-bold text-slate-700 mb-1.5 block">
                Organization Name
              </label>
              <div className="relative">
                <Building2 className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                <input
                  required
                  type="text"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Google Inc."
                />
                {touched.name && errors.name ? <p>{errors.name}</p> : null}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-bold text-slate-700 mb-1.5 block">
                  HR Name
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                  <input
                    required
                    type="text"
                    name="hrName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20"
                    placeholder="John Smith"
                  />
                  {touched.hrName && errors.hrName ? (
                    <p>{errors.hrName}</p>
                  ) : null}
                </div>
              </div>
              <div>
                <label className="text-sm font-bold text-slate-700 mb-1.5 block">
                  Industry
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                  <input
                    required
                    type="text"
                    name="industry"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20"
                    placeholder="Tech / Finance"
                  />
                  {touched.industry && errors.industry ? (
                    <p>{errors.industry}</p>
                  ) : null}
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm font-bold text-slate-700 mb-1.5 block">
                Website URL
              </label>
              <div className="relative">
                <Globe className="absolute left-4 top-4  w-5 h-5 text-slate-400" />
                <input
                  required
                  type="url"
                  name="website"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="https://company.com"
                />
                {touched.website && errors.website ? (
                  <p>{errors.website}</p>
                ) : null}
              </div>
            </div>

            <div>
              <label className="text-sm font-bold text-slate-700 mb-1.5 block">
                HR Contact Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                <input
                  required
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="hiring@company.com"
                />
                {touched.email && errors.email ? <p>{errors.email}</p> : null}
              </div>
            </div>

            <div>
              <label className="text-sm font-bold text-slate-700 mb-1.5 block">
                Set Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full pl-12 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="••••••••"
                />
                {touched.password && errors.password ? (
                  <p>{errors.password}</p>
                ) : null}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3 p-1 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all shadow-xl active:scale-95"
            >
              Register Organization
            </button>
          </form>
          <div className="mt-8 text-center pt-6 border-t border-slate-100">
            <p className="text-slate-500 text-sm">
              Already a partner?{" "}
              <Link
                to="/login"
                className="text-blue-600 font-bold hover:underline"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyRegister;

import React, { useEffect, useEffectEvent, useState } from "react";
// Fix: Ensured standard react-router-dom imports
import { Link, useNavigate } from "react-router-dom";
import {
  User as UserIcon,
  Mail,
  Lock,
  Eye,
  EyeOff,
  BookOpen,
  ShieldCheck,
} from "lucide-react";
import { AppLogo, appName } from "../App";
import { useFormik } from "formik";
import { object, string } from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { register } from "../services/authService";

const userValidationSchema = object({
  name: string().required("Name is required"),
  email: string().email("Invalid email").required("Email is required"),
  password: string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
  department: string().required("Department is required"),
  enrollmentNumber: string().required("Enrollment number is required"),
});

const DEPARTMENTS = [
  "Computer Engineering",
  "Information Technology",
  "Electronics & Communication",
  "Mechanical Engineering",
  "Civil Engineering",
  "Data Science & AI",
];

const StudentRegister = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const { handleSubmit, handleChange, errors, touched, handleBlur } = useFormik(
    {
      initialValues: {
        name: "",
        email: "",
        password: "",
        department: DEPARTMENTS[0],
        enrollmentNumber: "",
      },
      validationSchema: userValidationSchema,
      onSubmit: async (values) => {
        // console.log(values);
        try {
          // Frontend validation for email domain
          if (!values.email.endsWith("@university.edu")) {
            alert(
              "RESTRICTED ACCESS: You must use your official @university.edu email address to register.",
            );
            return;
          }

          const res = await register(values);
          console.log(res.data);
          toast.success("Register successfully");
          // navigate('/dashboard/student')
          navigate("/login");
        } catch (err) {
          console.log("Error message:", err);

          const errorMessage =
            err.response?.data?.message || "Something went wrong";

          toast.error(errorMessage);
        }
      },
    },
  );

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <AppLogo />
          <h1 className="text-3xl font-black text-slate-900 tracking-tight ">
            Student Enrollment
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            Institutional Identity Network
          </p>
        </div>

        <div className="bg-slate-200 p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100">
          <div className="mb-6 p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <p className="text-[10px] text-blue-700 font-bold uppercase tracking-wider leading-relaxed">
              Access restricted to verified students. System requires official{" "}
              <strong>@university.edu</strong> email.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                {" "}
                Name (As per records)
              </label>
              <div className="relative">
                <UserIcon className="absolute left-4 top-3 w-4 h-4 text-slate-400" />
                <input
                  required
                  type="text"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 font-bold text-sm"
                  placeholder="John Doe"
                />

                {touched.name && errors.name ? <p>{errors.name}</p> : null}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                  Enrollment ID
                </label>
                <input
                  required
                  type="text"
                  name="enrollmentNumber"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 font-black text-sm"
                  placeholder="TIT/2026/..."
                />

                {touched.EnrollmentId && errors.EnrollmentId ? (
                  <p>{errors.EnrollmentId}</p>
                ) : null}
              </div>
              <div>
                <label className="text-[10px] font-black  text-slate-400 uppercase tracking-widest block mb-1">
                  Department
                </label>
                <select
                  name="department"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-sm appearance-none cursor-pointer"
                >
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                Institutional Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                <input
                  name="email"
                  type="email"
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 font-bold text-sm"
                  placeholder="name@university.edu"
                />

                {touched.email && errors.email ? <p>{errors.email}</p> : null}
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                Security Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 font-bold text-sm"
                  placeholder="••••••••"
                />

                {touched.password && errors.password ? (
                  <p>{errors.password}</p>
                ) : null}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 p-1 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-lg hover:bg-slate-800 transition-all shadow-xl active:scale-95 mt-4"
            >
              Verify & Register
            </button>
          </form>

          <div className="mt-8 text-center pt-6 border-t border-slate-100">
            <p className="text-slate-500 text-xs font-medium ">
              Only authorized students can access this portal.
            </p>
            <p className="mt-2 text-sm">
              <Link
                to="/login"
                className="text-blue-600 font-bold hover:underline"
              >
                Already verified? Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentRegister;

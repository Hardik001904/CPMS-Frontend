import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  GraduationCap,
  Building2,
  Lock,
  Mail,
  AlertCircle,
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";
import { AppLogo } from "../App";
import { object, string } from "yup";
import { useFormik } from "formik";
import { login } from "../services/authService";
import toast from "react-hot-toast";

const userValidationSchema = object({
  email: string().email("Invalid email").required("Email is required"),
  password: string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
});

const myinitialValues = {
  email: "",
  password: "",
};

const LoginPage = ({ onLogin, allUsers = [] }) => {
  const navigate = useNavigate();

  // FIX 1: use simple string roles
  const [role, setRole] = useState("STUDENT");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const { handleSubmit, handleChange, errors, touched, handleBlur } = useFormik(
    {
      initialValues: myinitialValues,
      validationSchema: userValidationSchema,
      onSubmit: async (values) => {
        // addUser(values);
        // console.log(values);
        try {
          const change_data = {
            ...values,
            role,
          };

          // console.log("login : ",change_data)

          const res = await login(change_data);

          // console.log(res.data);
          toast.success("Login successfully");
          navigate(
            role === "STUDENT"
              ? "/dashboard/student/overview"
              : "/dashboard/company/overview",
          );
        } catch (err) {
          console.log("Error message:", err);

          const errorMessage =
            err.response?.data?.message || "Something went wrong";

          toast.error(errorMessage);
        }
      },
    },
  );

  // const addUser = (values) => {
  //   // console.log(values);
  //   alert("Institutional Identity Verified! You can now log in.");
  //   navigate("/login");
  // };

  const handleSubmit2 = (e) => {
    // e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* HEADER */}
        <div className="text-center mb-10">
          <AppLogo />
          <h2 className="text-3xl font-bold text-slate-900">Portal Login</h2>
          <p className="text-slate-500 mt-2">Access your placement dashboard</p>
        </div>

        {/* CARD */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 ">
          {/* ROLE SWITCH */}
          <div className="flex p-1 bg-slate-100 rounded-xl mb-8">
            <button
              onClick={() => {
                setRole("STUDENT");
                setError("");
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-bold ${
                role === "STUDENT"
                  ? "bg-white text-blue-600 shadow"
                  : "text-slate-500"
              }`}
            >
              <GraduationCap className="w-5 h-5" />
              Student
            </button>

            <button
              onClick={() => {
                setRole("COMPANY");
                setError("");
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-bold ${
                role === "COMPANY"
                  ? "bg-white text-blue-600 shadow"
                  : "text-slate-500"
              }`}
            >
              <Building2 className="w-5 h-5" />
              Company
            </button>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3 text-red-600 text-sm font-bold">
                <AlertCircle className="w-5 h-5" />
                {error}
              </div>
            )}

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-bold mb-2">
                Email Address
              </label>
              <div className="relative">
                {/* <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" /> */}
                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                <input
                  required
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 font-black text-sm"
                  placeholder="name@email.com"
                />
                {touched.email && errors.email ? <p>{errors.email}</p> : null}
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-bold mb-2">Password</label>
              <div className="relative">
                {/* <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" /> */}
                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  // value={password}
                  // onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 font-black text-sm"
                  placeholder="••••••••"
                />
                {touched.password && errors.password ? (
                  <p>{errors.password}</p>
                ) : null}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700"
            >
              Sign In
            </button>

            {/* LINKS */}
            <div className="text-center text-sm">
              <p>
                Need an account?{" "}
                <Link
                  to={
                    role === "STUDENT"
                      ? "/register/student"
                      : "/register/company"
                  }
                  className="text-blue-600 font-bold"
                >
                  Register Now
                </Link>
              </p>

              {/* <Link
                to="/admin-login"
                className="inline-flex items-center gap-2 text-xs mt-4 text-slate-400 hover:text-black"
              >
                <ShieldCheck className="w-4 h-4" />
                Management Access
              </Link> */}
            </div>
          </form>
        </div>

        <p className="text-center text-xs text-slate-400 mt-8">
          {/* © 2026 PlacementPro */}
          &copy; 2026 Campus Placement Management System
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

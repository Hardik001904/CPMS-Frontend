import { useState } from "react";
// import { User, UserRole } from '../types';
import {
  ShieldAlert,
  Lock,
  Mail,
  ChevronRight,
  ArrowLeft,
  Info,
} from "lucide-react";
// Fix: Removed .tsx/.ts extensions
import { INITIAL_ADMIN } from "../../utils/Constant";
import { Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { useFormik } from "formik";
import { login } from "../services/authService";

// interface AdminLoginProps {
//   onLogin: (user: User) => void;
// }

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

const AdminLogin = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    // e.preventDefault();
    console.log(values);
    // Default Credentials check
    if (email === "admin@placement.edu" && password === "Admin@123") {
      onLogin(INITIAL_ADMIN);
      navigate("/dashboard/admin/overview");
    } else {
      setError("Invalid administrative credentials. Access Denied.");
    }
  };

  const { handleSubmit, handleChange, errors, touched, handleBlur } = useFormik(
    {
      initialValues: myinitialValues,
      validationSchema: userValidationSchema,
      onSubmit: async (values) => {
        // addUser(values);
        try {
          const change_data = {
            ...values,
            role: "ADMIN",
          };
          console.log("admin login : ", change_data);
          await login(change_data);
          navigate("/dashboard/admin/overview");
        } catch (error) {
          setError("Invalid administrative credentials. Access Denied.");
        }
      },
    },
  );

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full">
        <div className="mb-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>
          <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center text-white mx-auto mb-6 shadow-2xl shadow-blue-500/30 ring-4 ring-blue-600/20">
            <ShieldAlert className="w-12 h-12" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Admin Console
          </h1>
          <p className="text-slate-500 mt-2 text-sm uppercase tracking-widest font-black">
            Authorized Personnel Only
          </p>
        </div>

        <div className="bg-slate-900 p-10 rounded-[2.5rem] border border-slate-800 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-500 text-sm font-bold flex items-center gap-3">
                <ShieldAlert className="w-5 h-5" />
                {error}
              </div>
            )}

            {/* <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl text-blue-400 text-xs font-medium flex items-start gap-3 mb-4">
              <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-bold text-blue-300 uppercase tracking-wider mb-1">Demo Credentials</p>
                <p>Email: <span className="text-white select-all">admin@placement.edu</span></p>
                <p>Pass: <span className="text-white select-all">Admin@123</span></p>
              </div>
            </div> */}

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
                <input
                  required
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-4 pl-14 pr-4 text-white placeholder-slate-600 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                  placeholder="admin@placement.edu"
                />
                {touched.email && errors.email ? <p>{errors.email}</p> : null}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">
                Security Key
              </label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
                <input
                  required
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  // value={password}
                  // onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-4 pl-14 pr-4 text-white placeholder-slate-600 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                  placeholder="••••••••"
                />
                {touched.password && errors.password ? (
                  <p>{errors.password}</p>
                ) : null}
              </div>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 shadow-2xl shadow-blue-600/20 group active:scale-[0.98]">
              Unlock Dashboard
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <p className="mt-8 text-center text-slate-700 text-[9px] uppercase font-black tracking-[0.3em]">
            Institutional Access Audit Protocol Active
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

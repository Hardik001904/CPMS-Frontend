import { useState } from "react";
import {
  ShieldAlert,
  Lock,
  Mail,
  ChevronRight,
  ArrowLeft,
  Info,
} from "lucide-react";
import { INITIAL_ADMIN } from "../../utils/Constant";
import { Link, useNavigate } from "react-router-dom";
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

const AdminLogin = ({ onLogin }) => {
  const navigate = useNavigate();
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pendingTakeover, setPendingTakeover] = useState(false);
  const [conflictInfo, setConflictInfo] = useState(null);
  // const handleLogin = (e) => {
  //   console.log(values);
  //   // Default Credentials check
  //   if (email === "admin@placement.edu" && password === "Admin@123") {
  //     onLogin(INITIAL_ADMIN);
  //     navigate("/dashboard/admin/overview");
  //   } else {
  //     setError("Invalid administrative credentials. Access Denied.");
  //   }
  // };

  const { handleSubmit, handleChange, errors, touched, handleBlur } = useFormik(
    {
      initialValues: myinitialValues,
      validationSchema: userValidationSchema,
      onSubmit: async (values) => {
        try {
          // const change_data = {
          //   ...values,
          //   role: "ADMIN",
          // };
          const payload = {
            email: values.email,
            password: values.password,
            role: "ADMIN",
            confirmTakeover: pendingTakeover,
          };
          const res = await login(payload);
          const { token, user } = res.data;

          sessionStorage.setItem("token", token);
          sessionStorage.setItem("user", JSON.stringify(user));

          // ──  notify the app that the user is now logged in ─────────────
          // if (onLogin) onLogin(user);

          setPendingTakeover(false);
          toast.success("Login successful");
          navigate("/dashboard/admin/overview");
        } catch (error) {
          console.log("error:", error);
          const errorMessage = error?.response?.data?.message;

          if (errorMessage === "SESSION_CONFLICT") {
            setConflictInfo(error.response.data.existingSession);
            return;
          }

          toast.error(errorMessage || "Login failed. Please try again.");
          setError("Invalid administrative credentials. Access Denied.");
        }
        //    finally {
        //   // ──  setSubmitting comes from formikHelpers (destructured above) ─
        //   setSubmitting(false);
        // }
      },
    },
  );
  // Called when the user clicks "Yes, log them out" in the conflict dialog.
  // We set the flag in state first, then re-submit.
  const handleTakeover = () => {
    setConflictInfo(null);
    setPendingTakeover(true);
    // setTimeout(0) ensures React flushes the state update before Formik
    // reads `pendingTakeover` inside onSubmit.
    setTimeout(() => handleSubmit(), 0);
  };

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

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-5 top-5 w-5 h-5 text-slate-600" />
                <input
                  required
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-4 pl-14 pr-4 text-white placeholder-slate-600 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                />
                {touched.email && errors.email ? <p>{errors.email}</p> : null}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">
                Security Key
              </label>
              <div className="relative">
                <Lock className="absolute left-5 top-4.5 w-5 h-5 text-slate-600" />
                <input
                  required
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-4 pl-14 pr-4 text-white placeholder-slate-600 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                  placeholder="••••••••"
                />
                {touched.password && errors.password ? (
                  <p>{errors.password}</p>
                ) : null}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 shadow-2xl shadow-blue-600/20 group active:scale-[0.98]"
            >
              Unlock Dashboard
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <p className="mt-8 text-center text-slate-700 text-[9px] uppercase font-black tracking-[0.3em]">
            Institutional Access Audit Protocol Active
          </p>
        </div>
        {/* ── SESSION CONFLICT DIALOG ──────────────────────────────────────── */}
        {conflictInfo && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                Account Already Active
              </h3>
              <p className="text-slate-500 text-sm mb-4">
                This account is currently logged in on another device:
              </p>
              <div className="bg-slate-50 rounded-xl p-4 text-sm space-y-2 mb-5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Browser</span>
                  <span className="font-semibold text-slate-800 text-right max-w-[60%] truncate">
                    {conflictInfo.browser}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Device</span>
                  <span className="font-semibold text-slate-800">
                    {conflictInfo.device}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">IP Address</span>
                  <span className="font-semibold text-slate-800">
                    {conflictInfo.ip}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Last Active</span>
                  <span className="font-semibold text-slate-800">
                    {new Date(conflictInfo.lastActive).toLocaleString()}
                  </span>
                </div>
              </div>
              <p className="text-sm text-slate-600 mb-5">
                Do you want to log that session out and continue here?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleTakeover}
                  className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold text-sm transition-colors"
                >
                  Yes, log them out
                </button>
                <button
                  onClick={() => setConflictInfo(null)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-sm transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;

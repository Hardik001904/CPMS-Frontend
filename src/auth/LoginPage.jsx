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

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();

  const [role, setRole] = useState("STUDENT");
  const [showPassword, setShowPassword] = useState(false);
  const [conflictInfo, setConflictInfo] = useState(null);

  // ── FIX 1: confirmTakeover must live in state, NOT as a param to onSubmit ──
  // Formik's onSubmit signature is (values, formikHelpers). You cannot pass
  // your own extra argument — any value you pass gets ignored/overridden.
  const [pendingTakeover, setPendingTakeover] = useState(false);

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    isSubmitting,
  } = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: userValidationSchema,

    // ── FIX 2: second param is formikHelpers ({ setSubmitting, ... }) ────────
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // ── FIX 3: send a flat object, not { change_data, confirmTakeover } ──
        const payload = {
          email: values.email,
          password: values.password,
          role,
          confirmTakeover: pendingTakeover,
        };

        // console.log("userdata : ",payload);
        const res = await login(payload);

        // ── FIX 4: variable is `res`, not `data` — was crashing here ─────────
        const { token, user } = res.data;

        sessionStorage.setItem("token", token);
        sessionStorage.setItem("user", JSON.stringify(user));

        // ── FIX 5: notify the app that the user is now logged in ─────────────
        // if (onLogin) onLogin(user);

        setPendingTakeover(false);
        toast.success("Login successful");
        navigate(
          role === "STUDENT"
            ? "/dashboard/student/overview"
            : "/dashboard/company/overview"
        );
      } catch (err) {
        const errorMessage = err?.response?.data?.message;

        if (errorMessage === "SESSION_CONFLICT") {
          setConflictInfo(err.response.data.existingSession);
          return; // no toast for this case — the dialog handles it
        }

        toast.error(errorMessage || "Login failed. Please try again.");
      } finally {
        // ── FIX 6: setSubmitting comes from formikHelpers (destructured above) ─
        setSubmitting(false);
      }
    },
  });

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
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* HEADER */}
        <div className="text-center mb-10">
          <AppLogo />
          <h2 className="text-3xl font-bold text-slate-900">Portal Login</h2>
          <p className="text-slate-500 mt-2">Access your placement dashboard</p>
        </div>

        {/* CARD */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* ROLE SWITCH */}
          <div className="flex p-1 bg-slate-100 rounded-xl mb-8">
            <button
              type="button"
              onClick={() => setRole("STUDENT")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-bold transition-all ${
                role === "STUDENT"
                  ? "bg-white text-blue-600 shadow"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <GraduationCap className="w-5 h-5" />
              Student
            </button>
            <button
              type="button"
              onClick={() => setRole("COMPANY")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-bold transition-all ${
                role === "COMPANY"
                  ? "bg-white text-blue-600 shadow"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <Building2 className="w-5 h-5" />
              Company
            </button>
          </div>

          {/* ── FIX 7: form onSubmit should be just `handleSubmit` ─────────────
               Wrapping it in `() => handleSubmit(false)` passes the synthetic
               event object as the first argument of your inner function,
               breaking Formik's event handling entirely.                     */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* EMAIL */}
            <div>
              <label className="block text-sm font-bold mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
                  placeholder="name@email.com"
                />
                {touched.email && errors.email && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-bold mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full pl-12 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
                  placeholder="••••••••"
                />
                {touched.password && errors.password && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.password}
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              <div className="text-right mt-3">
                {/* FIX 8: `role === "STUDENT" || "COMPANY"` is always true
                    because `"COMPANY"` is a truthy string. Simplified to one route. */}
                <Link
                  to="/forgot-password"
                  className="text-sm font-bold text-blue-600 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 text-white rounded-xl font-bold flex justify-center items-center gap-2 transition-colors ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isSubmitting && (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              {isSubmitting ? "Signing in…" : "Sign In"}
            </button>

            {/* REGISTER LINK */}
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
            </div>
          </form>
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
                {/* <div className="flex justify-between">
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
                </div> */}
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

        <p className="text-center text-xs text-slate-400 mt-8">
          &copy; 2026 Campus Placement Management System
        </p>
      </div>
    </div>
  );
};

export default LoginPage;


// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import {
//   GraduationCap,
//   Building2,
//   Lock,
//   Mail,
//   AlertCircle,
//   Eye,
//   EyeOff,
//   ShieldCheck,
// } from "lucide-react";
// import { AppLogo } from "../App";
// import { object, string } from "yup";
// import { useFormik } from "formik";
// import { login } from "../services/authService";
// import toast from "react-hot-toast";

// const userValidationSchema = object({
//   email: string().email("Invalid email").required("Email is required"),
//   password: string()
//     .min(6, "Minimum 6 characters")
//     .required("Password is required"),
// });

// const myinitialValues = {
//   email: "",
//   password: "",
// };

// const LoginPage = ({ onLogin, allUsers = [] }) => {
//   const navigate = useNavigate();

//   const [conflictInfo, setConflictInfo] = useState(null); // holds existing session data
//   const [role, setRole] = useState("STUDENT");
//   // const [email, setEmail] = useState("");
//   // const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");

//   const {
//     handleSubmit,
//     handleChange,
//     errors,
//     touched,
//     handleBlur,
//     isSubmitting,
//   } = useFormik({
//     initialValues: myinitialValues,
//     validationSchema: userValidationSchema,
//     onSubmit: async (values, confirmTakeover = false) => {
//       try {
//         const change_data = {
//           ...values,
//           role,
//         };

//         console.log("login data : ", { change_data, confirmTakeover });
//         const res = await login({ change_data, confirmTakeover });
//         console.log("done!!!!!", res.data);
//         // Save token and start session management
//         console.log("token", data.token);
//         sessionStorage.setItem("token", data.token);
//         // sessionStorage.setItem("user", JSON.stringify(data.user));

//         toast.success("Login successfully");
//         navigate(
//           role === "STUDENT"
//             ? "/dashboard/student/overview"
//             : "/dashboard/company/overview",
//         );
//       } catch (err) {
//         console.log("Error message:", err);

//         const errorMessage = err.response?.data?.message;
//         if (errorMessage === "SESSION_CONFLICT") {
//           // Show the "someone is already logged in" dialog
//           setConflictInfo(err.response.data.existingSession);
//           return;
//         }
//         toast.error(errorMessage);
//       } finally {
//         setSubmitting(false);
//       }
//     },
//   });

//   return (
//     <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
//       <div className="max-w-md w-full">
//         {/* HEADER */}
//         <div className="text-center mb-10">
//           <AppLogo />
//           <h2 className="text-3xl font-bold text-slate-900">Portal Login</h2>
//           <p className="text-slate-500 mt-2">Access your placement dashboard</p>
//         </div>

//         {/* CARD */}
//         <div className="bg-white rounded-2xl shadow-2xl p-8 ">
//           {/* ROLE SWITCH */}
//           <div className="flex p-1 bg-slate-100 rounded-xl mb-8">
//             <button
//               onClick={() => {
//                 setRole("STUDENT");
//                 setError("");
//               }}
//               className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-bold ${
//                 role === "STUDENT"
//                   ? "bg-white text-blue-600 shadow"
//                   : "text-slate-500"
//               }`}
//             >
//               <GraduationCap className="w-5 h-5" />
//               Student
//             </button>

//             <button
//               onClick={() => {
//                 setRole("COMPANY");
//                 setError("");
//               }}
//               className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-bold ${
//                 role === "COMPANY"
//                   ? "bg-white text-blue-600 shadow"
//                   : "text-slate-500"
//               }`}
//             >
//               <Building2 className="w-5 h-5" />
//               Company
//             </button>
//           </div>

//           {/* FORM */}
//           <form
//             onSubmit={() => {
//               handleSubmit(false);
//             }}
//             className="space-y-6"
//           >
//             {error && (
//               <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3 text-red-600 text-sm font-bold">
//                 <AlertCircle className="w-5 h-5" />
//                 {error}
//               </div>
//             )}

//             {/* EMAIL */}
//             <div>
//               <label className="block text-sm font-bold mb-2">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
//                 <input
//                   required
//                   type="email"
//                   name="email"
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 font-black text-sm"
//                   placeholder="name@email.com"
//                 />
//                 {touched.email && errors.email ? <p>{errors.email}</p> : null}
//               </div>
//             </div>

//             {/* PASSWORD */}
//             <div>
//               <label className="block text-sm font-bold mb-2">Password</label>
//               <div className="relative">
//                 <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   required
//                   name="password"
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   className="w-full pl-12 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 font-black text-sm"
//                   placeholder="••••••••"
//                 />
//                 {touched.password && errors.password ? (
//                   <p>{errors.password}</p>
//                 ) : null}

//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-4 top-3.5"
//                 >
//                   {showPassword ? (
//                     <EyeOff className="w-5 h-5" />
//                   ) : (
//                     <Eye className="w-5 h-5" />
//                   )}
//                 </button>
//                 <div className="text-right block text-sm font-bold my-4">
//                   <p>
//                     <Link
//                       to={
//                         role === "STUDENT" || "COMPANY"
//                           ? "/forgot-password"
//                           : "/reset-password/:token"
//                       }
//                     >
//                       Forgot Password?
//                     </Link>
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* SUBMIT */}

//             {/* <button
//               type="submit"
//               className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700"
//             >
//               Sign In
//             </button> */}
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className={`w-full py-4 text-white rounded-xl font-bold flex justify-center items-center gap-2 transition-colors 
//                           ${isSubmitting ? "bg-gray-400 hover:bg-gray-600 cursor-not-allowed" : "bg-blue-600"}`}

//               // className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold flex justify-center items-center gap-2"
//             >
//               {isSubmitting && (
//                 <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//               )}
//               {isSubmitting ? "Signing..." : "Sign In"}
//             </button>
//             {/* LINKS */}
//             <div className="text-center text-sm">
//               <p>
//                 Need an account?{" "}
//                 <Link
//                   to={
//                     role === "STUDENT"
//                       ? "/register/student"
//                       : "/register/company"
//                   }
//                   className="text-blue-600 font-bold"
//                 >
//                   Register Now
//                 </Link>
//               </p>
//             </div>
//           </form>
//         </div>
//         {/* ── SESSION CONFLICT DIALOG ── */}
//         {conflictInfo && (
//           <div
//             style={{
//               position: "fixed",
//               inset: 0,
//               background: "rgba(0,0,0,0.5)",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             <div
//               style={{
//                 background: "#fff",
//                 padding: 24,
//                 borderRadius: 8,
//                 maxWidth: 400,
//               }}
//             >
//               <h3>Account Already Active</h3>
//               <p>This account is currently logged in on:</p>
//               <ul>
//                 <li>
//                   <strong>Browser:</strong> {conflictInfo.browser}
//                 </li>
//                 <li>
//                   <strong>Device:</strong> {conflictInfo.device}
//                 </li>
//                 <li>
//                   <strong>IP:</strong> {conflictInfo.ip}
//                 </li>
//                 <li>
//                   <strong>Last active:</strong>{" "}
//                   {new Date(conflictInfo.lastActive).toLocaleString()}
//                 </li>
//               </ul>
//               <p>Do you want to log that session out and continue here?</p>
//               <div style={{ display: "flex", gap: 12 }}>
//                 <button
//                   onClick={() => {
//                     setConflictInfo(null);
//                     handleSubmit(true); // confirmTakeover = true
//                   }}
//                   style={{
//                     background: "#e53e3e",
//                     color: "#fff",
//                     padding: "8px 16px",
//                     borderRadius: 4,
//                   }}
//                 >
//                   Yes, log them out
//                 </button>
//                 <button
//                   onClick={() => setConflictInfo(null)}
//                   style={{ padding: "8px 16px", borderRadius: 4 }}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         <p className="text-center text-xs text-slate-400 mt-8">
//           &copy; 2026 Campus Placement Management System
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

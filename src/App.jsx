import { useEffect, useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import StudentRegister from "./auth/StudentRegister";
import CompanyRegister from "./auth/CompanyRegister";
import LoginPage from "./auth/LoginPage";
import AdminLogin from "./auth/AdminLogin";
import LandingPage from "./pages/LandingPage";
import DummyPage from "./components/DummyPage";
import StudentDashboard from "./pages/StudentDashboard";
// import { JobListingView } from "./components/student/JobListingView";
import CompanyDashboard from "./pages/CompanyDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import SessionExpired from "./pages/SessionExpired";
// import Bin from "./components/Admin/Bin";
import Loader from "./components/Loader";
import ForgotPassword from "./auth/Forgotpassword";
import ResetPassword from "./auth/Resetpassword";
// import { NotificationToastProvider } from "./components/Notifications/NotificationToast";
// import { useNotificationSocket } from "./hooks/useNotificationSocket";
// import NotificationsPage from "./pages/NotificationsPage";

export const appName = "Placement Pro";
export const appLogo = "P";

// ── NEW: Notification imports ──────────────────────────────────────────────
import { NotificationToastProvider } from "./components/Notifications/NotificationToast";
import { useNotificationSocket } from "./hooks/useNotificationSocket";
import { useNotificationStore } from "./store/notificationStore";
import NotificationsPage from "./pages/NotificationsPage";
import { logoutUser } from "./services/authService";
import { AuthProvider } from "./context/AuthContect";
import AboutUs from "./pages/public/AboutUs";
import Services from "./pages/public/Services";
import ContactUs from "./pages/public/ContactUs";
// import { logoutUser } from "../utils/sessionManager";
// ───────────────────────────────────────────────────────────────────────────

function AuthenticatedLayout() {
  // ── NEW: Connect to notification socket ──────────────────────────────────
  useNotificationSocket();
  // ────────────────────────────────────────────────────────────────────────

  return (
    <>
      {/* <Navbar /> Your Navbar already has NotificationBell inside */}
      <Outlet />
    </>
  );
}
export const AppLogo = () => {
  return (
    <Link to="/" className="inline-flex items-center gap-2 mb-6">
      <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-xl">
        {appLogo}
      </div>
      <span className="text-2xl font-bold text-white-900">{appName}</span>
    </Link>
  );
};

function App() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Loader before landing page
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, []);

  // Auto logout after inactivity
  // useEffect(() => {
  //   let timer;

  //   const logout = async () => {
  //     console.log("app dashabord");
  //     await logoutUser();

  //     navigate("/session-expired");
  //   };

  //   const resetTimer = () => {
  //     console.log("resetTimer");
  //     clearTimeout(timer);
  //     timer = setTimeout(logout, 15 * 60 * 1000); // 15 min
  //   };

  //   // events to detect activity
  //   window.addEventListener("mousemove", resetTimer);
  //   window.addEventListener("keydown", resetTimer);
  //   window.addEventListener("click", resetTimer);
  //   window.addEventListener("scroll", resetTimer);

  //   resetTimer(); // start timer
  //   return () => {
  //     window.removeEventListener("mousemove", resetTimer);
  //     window.removeEventListener("keydown", resetTimer);
  //     window.removeEventListener("click", resetTimer);
  //     window.removeEventListener("scroll", resetTimer);
  //   };
  // }, []);

  useEffect(() => {
  const token = sessionStorage.getItem("token");
  if (!token) return;

  // Ping every 4 minutes — well within the 15-min backend inactivity window.
  // Previous code pinged every 15 min which is TOO LATE (backend already expired session).
  const interval = setInterval(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/auth/ping`, {
      headers: { Authorization: `Bearer ${token}` },
    }).catch(() => {
      // If ping fails (401), the axios interceptor in sessionManager.js
      // will handle the redirect to /session-expired.
    });
  }, 4 * 60 * 1000); // ← 4 minutes, NOT 15

  return () => clearInterval(interval);
}, []);

  // useEffect(() => {
  //   const token = sessionStorage.getItem("token");
  //   // console.log("/api/ping")
  //   if (!token) return;
  //   const interval = setInterval(
  //     () => {
  //       console.log("interval");
  //       // console.log(object)
  //       fetch("/api/ping", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //     },
  //     15 * 60 * 1000,
  //   ); // every 15 min

  //   return () => clearInterval(interval);
  // }, []);
  // Show loader first
  if (loading) {
    return <Loader />;
  }
  return (
    <>
      {/* <NotificationToastProvider /> */}
      <AuthProvider>
      <Toaster position="top-center" />
        <Routes>
          <Route path="/*" element={<LandingPage />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/register/student" element={<StudentRegister />} />
          <Route path="/register/company" element={<CompanyRegister />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/session-expired" element={<SessionExpired />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<ContactUs />} />

          {/* Student Dashboard */}
          <Route
            path="/dashboard/student/*"
            element={
              <ProtectedRoute allowedRoles={["STUDENT"]}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />

          {/* Company Dashboard */}
          <Route
            path="/dashboard/company/*"
            element={
              <ProtectedRoute allowedRoles={["COMPANY"]}>
                <CompanyDashboard />
              </ProtectedRoute>
            }
          />

          {/* Admin Dashboard */}
          <Route
            path="/dashboard/admin/*"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Notifications */}
          <Route element={<AuthenticatedLayout />}>
            <Route path="/notifications" element={<NotificationsPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;

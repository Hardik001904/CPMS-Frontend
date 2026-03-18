import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import "./App.css";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import StudentRegister from "./auth/StudentRegister";
import CompanyRegister from "./auth/CompanyRegister";
import LoginPage from "./auth/LoginPage";
import AdminLogin from "./auth/AdminLogin";
import LandingPage from "./pages/LandingPage";
import DummyPage from "./components/DummyPage";
import StudentDashboard from "./pages/StudentDashboard";
import { JobListingView } from "./components/student/JobListingView";
import CompanyDashboard from "./pages/CompanyDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import SessionExpired from "./pages/SessionExpired";
import Bin from "./components/Admin/Bin";

export const appName = "Placement Pro";
export const appLogo = "P";

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
  const [count, setCount] = useState(0);

  const navigate = useNavigate();
  useEffect(() => {
    let timer;

    const logout = () => {
      localStorage.removeItem("token");
      navigate("/login");
    };

    const resetTimer = () => {
      console.log("resetTimer");
      clearTimeout(timer);
      timer = setTimeout(logout, 15 * 60 * 1000); // 15 min
    };

    // events to detect activity
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("click", resetTimer);

    resetTimer(); // start timer
    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
    };
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
console.log("/api/ping")
    if (!token) return;

    const interval = setInterval(
      () => {
        fetch("/api/ping", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      },
      15 * 60 * 1000,
    ); // every 5 min

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <Toaster position="top-center" />

      <Routes>
        <Route path="/*" element={<LandingPage />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        <Route path="/register/student" element={<StudentRegister />} />
        <Route path="/register/company" element={<CompanyRegister />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/session-expired" element={<SessionExpired />} />

        <Route
          path="/dashboard/student/*"
          element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/company/*"
          element={
            <ProtectedRoute allowedRoles={["COMPANY"]}>
              <CompanyDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/admin/*"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/dummy" element={<DummyPage />} />
      </Routes>
    </>
  );
}

export default App;

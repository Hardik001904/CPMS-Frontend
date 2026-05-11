import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import { DashboardHeader } from "../components/Layout";
import {
  Building2,
  Briefcase,
  Users,
  PlusCircle,
  Search,
  Check,
  X,
  FileText,
  Save,
  ChevronRight,
  LayoutDashboard,
  MapPin,
  DollarSign,
  User as UserIcon,
  Globe,
  GraduationCap,
  Award,
  Phone,
  Mail,
  Calendar,
  Info,
  Power,
  PowerOff,
  BookOpen,
  Activity,
} from "lucide-react";

import PostJob from "../components/company/PostJob";
import { SidebarNew } from "../components/SidebarNew";
import MyJob from "../components/company/MyJob";
import Applicants from "../components/company/Applicants";
import Profile from "../components/company/Profile";
import { useFormik } from "formik";
import { string } from "yup";
import {
  fetchAllJobs,
  getCompanyApplication,
  getCompanyOverview,
} from "../services/companyService";
import SettingPage from "./SettingPage";
import { logoutUser } from "../services/authService";

const CompanyDashboard = ({
  onUpdateJobs,
  onUpdateApps,
  allUsers,
  onUpdateUser,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(sessionStorage.getItem("user")) || {};

  const [jobs, setJobs] = useState([]);
  const [overview, setOverview] = useState({});
  const [applications, setApplications] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    getJobs();
    getOverview();
    getApplications();
  }, []);

  const getOverview = async () => {
    const res = await getCompanyOverview();
    setOverview(res);
  };

  const getApplications = async () => {
    const res = await getCompanyApplication();
    setApplications(res);
  };

  const getJobs = async () => {
    try {
      const res = await fetchAllJobs();
      setJobs(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const currentPath = location.pathname.split("/").pop() || "overview";

  const companyJobs = jobs.filter((j) => j.companyId === user._id);

  const companyApps = applications?.filter((a) => a.companyId === user?.id);

  const profile = user?.profile || {
    description: "",
    website: "",
    location: "",
    size: "",
    hrName: "",
    industry: "",
  };

  const [viewingCandidate, setViewingCandidate] = useState(null);

  const SidebarItems = [
    {
      icon: <LayoutDashboard className="w-5 h-5" />,
      label: "Overview",
      active: currentPath === "overview",
      onClick: () => navigate("/dashboard/company/overview"),
    },
    {
      icon: <PlusCircle className="w-5 h-5" />,
      label: "Post Job",
      active: currentPath === "post-job",
      onClick: () => navigate("/dashboard/company/post-job"),
    },
    {
      icon: <FileText className="w-5 h-5" />,
      label: "My Job",
      active: currentPath === "my-jobs",
      onClick: () => navigate("/dashboard/company/my-jobs"),
    },
    {
      icon: <Users className="w-5 h-5" />,
      label: "Applicants",
      active: currentPath === "applicants",
      onClick: () => navigate("/dashboard/company/applicants"),
    },
    {
      icon: <Building2 className="w-5 h-5" />,
      label: "Profile",
      active: currentPath === "profile",
      onClick: () => navigate("/dashboard/company/profile"),
    },
  ];

  const toggleJobStatus = (jobId) => {
    const updatedJobs = jobs.map((j) => {
      if (j.id === jobId) {
        const newStatus = j.status === "Open" ? "Closed" : "Open";
        return { ...j, status: newStatus };
      }
      return j;
    });
    onUpdateJobs(updatedJobs);
    alert("Listing visibility updated on the Student Portal.");
  };

  const handleStatus = (appId) => {
    onUpdateApps(
      applications.map((a) => (a.id === appId ? { ...a, status } : a)),
    );
    if (viewingCandidate && viewingCandidate.app.id === appId) {
      setViewingCandidate({
        ...viewingCandidate,
        app: { ...viewingCandidate.app, status },
      });
    }
  };

  const updateProfile = (updates) => {
    onUpdateUser(
      allUsers.map((u) =>
        u.id === user.id ? { ...u, profile: { ...profile, ...updates } } : u,
      ),
    );
  };

  const name = user.name.split(" ")[0];

  const logout = async () => {
    // sessionStorage.removeItem("token");
    // sessionStorage.removeItem("user");
    await logoutUser();
    // navigate("/");
    navigate("/");
  };

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <SidebarNew
        title="Corporate Hub"
        userName={user?.name}
        onLogout={logout}
        items={SidebarItems}
        role="Recruiter"
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      <main
        className={`flex-1 transition-all duration-500 ease-in-out min-w-0 ${isCollapsed ? "md:ml-20" : "md:ml-72"}`}
      >
        <DashboardHeader
          title={`Recruiter Portal - ${currentPath.toUpperCase()}`}
          user={user}
          onLogout={logout}
        />
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          <Routes>
            <Route
              path="overview"
              element={
                <div className="space-y-6 md:space-y-8 animate-in fade-in duration-700">
                  {/* Hero Banner */}
                  <div className="bg-[#0a0f1d] z-5 rounded-2xl md:rounded-[2.5rem] p-6  md:p-10 text-white flex flex-col lg:flex-row justify-between lg:items-center gap-6 shadow-2xl relative overflow-hidden">
                    <div className="relative z-10">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] border border-blue-500/20 mb-4 md:mb-6">
                        <Activity className="w-3.5 h-3.5 animate-pulse" />{" "}
                        Corporate Identity Active
                      </div>
                      <h3 className="text-2xl md:text-4xl font-black mb-3 tracking-tighter  leading-tight">
                        Welcome, <span>{overview.name}</span>
                      </h3>
                      <p className="text-slate-400 max-w-md font-bold text-sm md:text-base">
                        Your organization,{" "}
                        <span className="text-white">{user?.name}</span>, has{" "}
                        {overview?.activeMandates || 0} live hiring mandates
                      </p>
                    </div>
                    <button
                      onClick={() => navigate("/dashboard/company/post-job")}
                      className=" bg-blue-600 hover:bg-blue-500 px-8 md:px-12 py-4 md:py-5 rounded-2xl font-black shadow-[0_20px_40px_rgba(37,99,235,0.3)] transition-all active:scale-95 text-sm uppercase tracking-widest w-full lg:w-auto text center "
                    >
                      Initiate Drive
                    </button>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
                  </div>

                  {/* Stats Grid — 1 col mobile, 3 col desktop */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4  md:gap-6">
                    {[
                      {
                        label: "Active Mandates",
                        value: overview?.activeMandates || 0,
                        color: "text-slate-900",
                        bg: "bg-white",
                      },
                      {
                        label: "Talent Pool",
                        value: overview?.talentPool || 0,
                        color: "text-blue-600",
                        bg: "bg-blue-50",
                      },
                      {
                        label: "Successful Hires",
                        value: overview?.successfulHires || 0,
                        color: "text-emerald-600",
                        bg: "bg-emerald-50",
                      },
                    ].map((stat, i) => (
                      <div
                        key={i}
                        className={`p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-2xl transition-all group ${stat.bg}`}
                      >
                        <p className="text-[10px] font-black text-slate-400  uppercase tracking-[0.3em] mb-2">
                          {stat.label}
                        </p>
                        <p
                          className={`text-4xl md:text-5xl font-black  tracking-tighter  ${stat.color}`}
                        >
                          {stat.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              }
            />

            {/* Other routes remain with updated styling for cards */}
            <Route path="post-job" element={<PostJob />} />

            <Route path="my-jobs" element={<MyJob />} />

            <Route
              path="applicants"
              element={<Applicants refreshOverview={getOverview} />}
            />

            <Route
              path="profile"
              element={
                <Profile
                  user={user}
                  profile={profile}
                  allUsers={allUsers}
                  onUpdateUser={onUpdateUser}
                />
              }
            />

            <Route path="*" element={<Navigate to="overview" />} />
            <Route
              path="settings"
              element={<SettingPage user={user} onLogout={logout} />}
            />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default CompanyDashboard;

import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
// import { Sidebar, DashboardHeader } from '../components/Layout';
import { DashboardHeader, Sidebar } from "../components/Layout";
// import { User, Job, Application, ApplicationStatus, CompanyProfile, UserRole, StudentProfile } from '../types';
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

// interface CompanyDashboardProps {
//   user: User;
//   onLogout: () => void;
//   jobs: Job[];
//   onUpdateJobs: (jobs: Job[]) => void;
//   applications: Application[];
//   onUpdateApps: (apps: Application[]) => void;
//   allUsers: User[];
//   onUpdateUser: (users: User[]) => void;
// }

import PostJob from "../components/company/PostJob";
import { SidebarNew } from "../components/SidebarNew";
import MyJob from "../components/company/MyJob";
import Applicants from "../components/company/Applicants";
import Profile from "../components/company/Profile";
// import { handlePost } from "../components/company/HandlePost";
// import applications from "../../utils/JSON/cpms_apps.json";
import { useFormik } from "formik";
import { string } from "yup";
import {
  fetchAllJobs,
  getCompanyApplication,
  getCompanyOverview,
} from "../services/companyService";

// const userValidationSchema = object({
//   // id: string().required(),
//   title: string().required(),
//   location: string().required(),
//   salary: string().required(),
//   description: string().required(),
//   criteria: string().required(),
//   status: string().required()

// })

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
    // console.log("overview res",res)
    setOverview(res);
    // console.log(res )
  };

  const getApplications = async () => {
    const res = await getCompanyApplication();
    // console.log("getApplications", res);
    console.log(res.data);
    setApplications(res);
  };

  const getJobs = async () => {
    try {
      const res = await fetchAllJobs();
      // console.log("API Response:" , res.data);
      setJobs(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const currentPath = location.pathname.split("/").pop() || "overview";

  // const companyJobs = jobs?.filter((j) => j.companyId === user?.id);
  const companyJobs = jobs.filter((j) => j.companyId === user._id);

  // console.log("First Job CompanyId:", jobs[0]?.companyId);

  const companyApps = applications?.filter((a) => a.companyId === user?.id);
  // console.log("applications:", applications);

  const profile = user?.profile || {
    description: "",
    website: "",
    location: "",
    size: "",
    hrName: "",
    industry: "",
  };

  //   const [viewingCandidate, setViewingCandidate] = useState<{app: Application, student: User} | null>(null);
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

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
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
        className={`flex-1 transition-all duration-500 ease-in-out ${isCollapsed ? "md:ml-20" : "md:ml-72"}`}
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
                <div className="space-y-8 animate-in fade-in duration-700">
                  <div className="bg-[#0a0f1d] rounded-[2.5rem] p-10 md:p-10 text-white flex flex-col lg:flex-row justify-between lg:items-center gap-8 shadow-2xl relative overflow-hidden">
                    <div className="relative z-10">
                      <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] border border-blue-500/20 mb-6">
                        <Activity className="w-3.5 h-3.5 animate-pulse" />{" "}
                        Corporate Identity Active
                      </div>
                      <h3 className="text-3xl md:text-4xl font-black mb-4 tracking-tighter  leading-tight">
                        {/* Welcome, {profile?.hrName || user?.name.split(" ")[0]}! */}
                        Welcome, <span>{overview.name}</span>
                      </h3>
                      <p className="text-slate-400 max-w-md font-bold ">
                        Your organization,{" "}
                        <span className="text-white">{user?.name}</span>, has{" "}
                        {/* {overview?.length} live hiring mandates. */}
                        {overview?.activeMandates || 0} live hiring mandates
                      </p>
                    </div>
                    <button
                      onClick={() => navigate("/dashboard/company/post-job")}
                      className="relative z-5 bg-blue-600 hover:bg-blue-500 px-12 py-5 rounded-2xl font-black shadow-[0_20px_40px_rgba(37,99,235,0.3)] transition-all active:scale-95 text-sm uppercase tracking-widest "
                    >
                      Initiate Drive
                    </button>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* {[
                      {
                        label: "Active Mandates",
                        value: companyJobs?.filter((j) => j.status === "Open")
                          .length,
                        color: "text-slate-900",
                        bg: "bg-white",
                        
                      },
                      {
                        label: "Talent Pool",
                        value: companyApps?.length,
                        color: "text-blue-600",
                        bg: "bg-blue-50",
                      },
                      {
                        label: "Successful Hires",
                        value: companyApps?.filter(
                          (a) => a.status === ApplicationStatus.SELECTED,
                        ).length,
                        color: "text-emerald-600",
                        bg: "bg-emerald-50",
                      },
                    ] */}
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
                        className={`p-10 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-2xl transition-all group ${stat.bg}`}
                      >
                        <p className="text-[10px] font-black text-slate-400  uppercase tracking-[0.3em] mb-2">
                          {stat.label}
                        </p>
                        <p
                          className={`text-5xl font-black  tracking-tighter  ${stat.color}`}
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
            {/* //   companyApps={companyApps}
              //   applications={applications}
              //   onUpdateApps={onUpdateApps}
              // /> */}

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
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default CompanyDashboard;

import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import { DashboardHeader } from "../components/Layout";

// import { User, UserRole, Job, Application } from '../types';
import {
  LayoutDashboard,
  Users,
  Building2,
  ShieldCheck,
  PieChart,
  AlertTriangle,
  FileCheck,
  Briefcase,
  Activity,
  Database,
} from "lucide-react";

// interface AdminDashboardProps {
//   user: User;
//   onLogout: () => void;
//   allUsers: User[];
//   onUpdateUsers: (users: User[]) => void;
//   jobs: Job[];
//   applications: Application[];
// }

// import user from "../../utils/JSON/cpms_user.json";
import { SidebarNew } from "../components/SidebarNew";
import Approvals from "../components/Admin/Approvals";
import StudentDirectory from "../components/Admin/StudentDirectory";
import HiringPartners from "../components/Admin/HiringPartners";
import LiveActivities from "../components/Admin/LiveActivities";
import Reports from "../components/Admin/Reports";
import { fetchUser } from "../services/studentService";
import toast from "react-hot-toast";
import { fetchAllJobs } from "../services/companyService";
import allUsers from "../../utils/JSON/cpms_all_users.json"
// import applications from "../../utils/JSON/cpms_apps.json"

export const UserRole = {
  STUDENT: "STUDENT",
  COMPANY: "COMPANY",
  ADMIN: "ADMIN",
};

const AdminDashboard = ({
  onLogout,
  onUpdateUsers,

  applications,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const currentPath = location.pathname.split("/").pop() || "overview";
  const [user, setUser] = useState([]);
  const [jobs, setJobs] = useState([]);

  const getUserProfile = async () => {
    try {
      const res = await fetchUser();
      // console.log("res profile", res.count);
      setUser(res.count);
      // toast.success(res.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const getJobs = async () => {
    try {
      const res = await fetchAllJobs();
      setJobs(res.data);
      console.log("getJobs", res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserProfile();
    getJobs();
  }, []);

  const pending = allUsers?.filter(
    (u) => !u.isApproved && u.role !== UserRole.ADMIN,
  );
  const students = allUsers?.filter(
    (u) => u.role === UserRole.STUDENT && u.isApproved,
  );
  const companies = allUsers?.filter(
    (u) => u.role === UserRole.COMPANY && u.isApproved,
  );
  // console.log("companies : ", companies);
  const handleAction = (id) => {
    if (approve) {
      onUpdateUsers(
        allUsers?.map((u) => (u.id === id ? { ...u, isApproved: true } : u)),
      );
    } else {
      onUpdateUsers(allUsers?.filter((u) => u.id !== id));
    }
  };

// const handleAction = async (id) => {
//   try {
//     await approveUser(id);

//     // Remove user from list after approval
//     setPending((prev) => prev.filter((u) => u._id !== id));

//   } catch (error) {
//     console.error("Approval failed", error);
//   }
// };

  const sidebarItems = [
    {
      icon: <LayoutDashboard className="w-5 h-5" />,
      label: "Overview",
      active: currentPath === "overview",
      onClick: () => navigate("/dashboard/admin/overview"),
    },
    {
      icon: <FileCheck className="w-5 h-5" />,
      label: "Pending Approvals",
      active: currentPath === "approvals",
      onClick: () => navigate("/dashboard/admin/approvals"),
    },
    {
      icon: <Users className="w-5 h-5" />,
      label: "Student Directory",
      active: currentPath === "students",
      onClick: () => navigate("/dashboard/admin/students"),
    },
    {
      icon: <Building2 className="w-5 h-5" />,
      label: "Hiring Partners",
      active: currentPath === "companies",
      onClick: () => navigate("/dashboard/admin/companies"),
    },
    {
      icon: <Activity className="w-5 h-5" />,
      label: "Live Activities",
      active: currentPath === "activities",
      onClick: () => navigate("/dashboard/admin/activities"),
    },
    {
      icon: <PieChart className="w-5 h-5" />,
      label: "Reports",
      active: currentPath === "reports",
      onClick: () => navigate("/dashboard/admin/reports"),
    },
  ];

  return (
    <div className="flex bg-slate-50 min-h-screen font-sans">
      <SidebarNew
        title="Admin Portal"
        userName="Principal Controller"
        onLogout={onLogout}
        items={sidebarItems}
        role="Institutional Access"
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      <main
        className={`flex-1 transition-all duration-500 ease-in-out ${isCollapsed ? "md:ml-20" : "md:ml-72"}`}
      >
        <DashboardHeader
          title={`System Console / ${currentPath.toUpperCase()}`}
          user={user}
          onLogout={onLogout}
        />
        <div className="p-4  md:p-8 max-w-7xl mx-auto ">
          <Routes>
            <Route
              path="overview"
              element={
                <div className="space-y-8 animate-in fade-in duration-700">
                  <div className="bg-[#0a0f1d] rounded-[3rem] p-10 md:p-14 text-white shadow-2xl relative overflow-hidden border border-white/5">
                    <div className="relative z-10">
                      <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] border border-emerald-500/20 mb-8">
                        <ShieldCheck className="w-3.5 h-3.5" /> Core Status:
                        Operational
                      </div>
                      <h3 className="text-4xl md:text-4xl font-black mb-6 tracking-tighter ">
                        System Intelligence Oversight
                      </h3>
                      <p className="text-slate-500 text-sm max-w-xl font-bold leading-relaxed ">
                        Managing the institutional gateway for professional
                        placements. Auditor protocol is active.
                      </p>
                    </div>
                    <div className="absolute -right-20 -bottom-20 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px]"></div>
                    <div className="absolute top-1/2 right-24 -translate-y-1/2 opacity-10 hidden xl:block">
                      <Database className="w-64 h-64 text-blue-500" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      {
                        label: "Live Mandates",
                        value: jobs?.length,
                        color: "text-blue-600",
                        icon: <Briefcase className="w-5 h-5" />,
                        bg: "bg-blue-50",
                      },
                      {
                        label: "Verified Students",
                        value: user,
                        color: "text-indigo-600",
                        icon: <Users className="w-5 h-5" />,
                        bg: "bg-indigo-50",
                      },
                      {
                        label: "Industry Partners",
                        value: companies?.length,
                        color: "text-purple-600",
                        icon: <Building2 className="w-5 h-5" />,
                        bg: "bg-purple-50",
                      },
                      {
                        label: "Pending Access",
                        value: pending?.length,
                        color: "text-rose-600",
                        icon: <AlertTriangle className="w-5 h-5" />,
                        bg: "bg-rose-50",
                      },
                    ].map((stat, i) => (
                      <div
                        key={i}
                        className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm transition-all hover:shadow-2xl hover:-translate-y-1 group"
                      >
                        <div className="flex justify-between items-center mb-6">
                          <div
                            className={`p-4 ${stat.bg} ${stat.color} rounded-2xl group-hover:bg-slate-900 group-hover:text-white transition-all`}
                          >
                            {stat.icon}
                          </div>
                          <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">
                            Global Status
                          </span>
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          {stat.label}
                        </p>
                        <p
                          className={`text-5xl font-black mt-2 ${stat.color} tracking-tighter `}
                        >
                          {stat.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              }
            />

            <Route path="approvals" element={<Approvals />} />

            <Route path="*" element={<Navigate to="overview" />} />

            <Route path="students" element={<StudentDirectory />} />

            <Route path="companies" element={<HiringPartners />} />

            <Route path="activities" element={<LiveActivities />} />

            <Route path="reports" element={<Reports />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

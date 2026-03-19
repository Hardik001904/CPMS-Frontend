import React, { useState, useMemo, useEffect } from "react";
// // Fix: Ensured standard react-router-dom imports
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
// // Fix: Removed file extensions from imports
import { Sidebar, DashboardHeader } from "../components/Layout";
// import { User, Job, Application, ApplicationStatus, StudentProfile, CompanyProfile } from '../types';
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  User as UserIcon,
  MapPin,
  DollarSign,
  Save,
  Hash,
  GraduationCap,
  Clock,
  Building2,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Mail,
  Phone,
  Calendar,
  Globe,
  Info,
  X,
  BookOpen,
  Award,
  Plus,
} from "lucide-react";

// import applications from "../../utils/JSON/cpms_apps.json";
import { JobListingView } from "../components/student/JobListingView";
import { ApplicationsView } from "../components/student/ApplicationsView";
import { StudentProfileEdit } from "../components/student/StudentProfileEdit";
import { SidebarNew } from "../components/SidebarNew";
import { fetchAllJobs } from "../services/companyService";
import { getStudentOverview } from "../services/studentService";
import axios from "../services/axios";
import SettingPage from "./SettingPage";

const StudentDashboard = () => {
  const [jobs, setJobs] = useState([]);

  const [overview, setOverview] = useState([]);
  const [sessions, setSessions] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(sessionStorage.getItem("user")) || {};
  const getJobs = async () => {
    try {
      const res = await fetchAllJobs();
      // console.log("inside student dashbord API Response:", res.data);
      setJobs(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getJobs();
    getOverview();
  }, []);
  // const studentApps = applications?.filter((a) => a.studentId === user.id);

  // const studentApps = (applications || []).filter(
  //   (a) => a.studentId === user.id,
  // );

  const getOverview = async () => {
    const res = await getStudentOverview();
    // console.log("res", res);
    setOverview(res);
  };

  const currentPath = location.pathname.split("/").pop() || "overview";
  // const currentPath = location.pathname.split("/").pop() ;
  // console.log(currentPath);

  const openJobs = jobs?.filter((j) => j.status === "Open");
  // console.log("jobs ", openJobs);
  // const openJobs = (jobs || []).filter((j) => j.status === "Open");

  const profile = user?.profile || {
    university: "",
    department: "",
    branch: "",
    cgpa: "",
    gradYear: "",
    phone: "",
    dob: "",
    skills: [],
    resumeUrl: "",
    enrollmentNumber: "",
    website: "",
    location: "",
  };

  //   //   const [viewingCompany, setViewingCompany] = useState<User | null>(null);
  const [viewingCompany, setViewingCompany] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const profileCompletion = useMemo(() => {
    let score = 0;
    if (user?.name) score += 10;
    if (profile.enrollmentNumber) score += 15;
    if (profile.department) score += 10;
    if (profile.cgpa) score += 15;
    if (profile.phone) score += 10;
    if (profile.skills && profile.skills.length > 0) score += 20;
    if (profile.website) score += 10;
    if (profile.location) score += 10;
    return Math.min(score, 100);
  }, [user, profile]);

  const sidebarItems = [
    {
      icon: <LayoutDashboard className="w-5 h-5" />,
      label: "Overview",
      active: currentPath === "overview",
      onClick: () => navigate("/dashboard/student/overview"),
    },
    {
      icon: <Briefcase className="w-5 h-5" />,
      label: "Job Listings",
      active: currentPath === "jobs",
      onClick: () => navigate("/dashboard/student/jobs"),
    },
    {
      icon: <FileText className="w-5 h-5" />,
      label: "Applications",
      active: currentPath === "applications",
      onClick: () => navigate("/dashboard/student/applications"),
    },
    {
      icon: <UserIcon className="w-5 h-5" />,
      label: "Profile",
      active: currentPath === "profile",
      onClick: () => navigate("/dashboard/student/profile"),
    },
  ];

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    // onClose();
    navigate("/");
  };
  const name = user.name.split(" ")[0];
  useEffect(() => {
    const fetchSessions = async () => {
      const res = await axios.get("/auth/sessions");
      console.log("fetchSessions : ", res.data);
      setSessions(res.data);
    };

    fetchSessions();
  }, []);
  return (
    <div className="flex bg-slate-50 min-h-screen font-sans">
      <SidebarNew
        title="Student Portal"
        userName={user?.name || "Student"}
        onLogout={logout}
        items={sidebarItems}
        role="Student Candidate"
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      <main
        className={`flex-1 transition-all duration-500 ease-in-out ${isCollapsed ? "md:ml-20" : "md:ml-72"}`}
      >
        <DashboardHeader
          title={`Student Hub / ${currentPath.toUpperCase()}`}
          user={user}
          onLogout={logout}
        />
        <div className="p-8">
          <Routes>
            <Route
              path="overview"
              element={
                <div className="space-y-8 animate-in fade-in duration-500">
                  <div className="bg-indigo-600 rounded-[2.5rem] z-5 p-10 text-white shadow-2xl relative overflow-hidden">
                    <div className="relative z-10 flex justify-between items-start">
                      <div>
                        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 text-white text-[10px] font-black uppercase tracking-widest border border-white/20 mb-6">
                          <CheckCircle2 className="w-4 h-3" /> Profile
                          Authenticated
                        </div>
                        <h3 className="text-4xl font-black mb-4 tracking-tighter ">
                          {/* Welcome, {user?.name.split(" ")[0]}! */}
                          Welcome, <span>{name}</span>
                          {overview.welcome}
                        </h3>
                        <div className="flex items-center gap-2 text-indigo-100 font-bold mb-8">
                          <Hash className="w-4 h-4" />
                          <span className="tracking-widest uppercase text-xs ">
                            Campus UID: {overview.campusId || "PENDING"}
                          </span>
                        </div>
                        <button
                          onClick={() => navigate("/dashboard/student/jobs")}
                          className="bg-white text-indigo-600 px-10 py-4 rounded-2xl font-black shadow-xl hover:bg-indigo-50 transition-all active:scale-95 flex items-center gap-2"
                        >
                          Explore Openings <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="text-right ">
                        <p className="text-sm z-2 font-black uppercase tracking-[0.3em] text-indigo-200 mb-2">
                          Placement Readiness
                        </p>
                        <p className="text-6xl  font-black tracking-tighter">
                          {overview.placementReadiness}%
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition-all group">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
                        Applications In Review
                      </p>
                      <p className="text-4xl font-black text-slate-900 mt-1">
                        {overview?.applicationsInReview}
                      </p>
                    </div>

                    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition-all group">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
                        Shortlists
                      </p>
                      <p className="text-4xl font-black text-emerald-600 mt-1">
                        {overview.shortlists}
                      </p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition-all group">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
                        Opportunities
                      </p>
                      <p className="text-4xl font-black text-purple-600 mt-1">
                        {overview.opportunities}
                      </p>
                    </div>
                  </div>
                </div>
              }
            />
            <Route path="jobs" element={<JobListingView />} />
            <Route
              path="applications"
              element={<ApplicationsView />}
              // element={<ApplicationsView studentApps={studentApps} />}
            />
            <Route
              path="profile"
              element={<StudentProfileEdit profile={profile} />}
            />
            <Route path="*" element={<Navigate to="overview" replace />} />

            <Route
              path="settings"
              element={
                <SettingPage
                  user={user}
                  onLogout={logout}
               
                />
              }
            />
          </Routes>
        </div>

        {/* Company Detail Modal */}
        {viewingCompany && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <div
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
              onClick={() => setViewingCompany(null)}
            ></div>
            <div className="relative bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
              <div className="bg-slate-900 p-12 text-white relative">
                <button
                  onClick={() => setViewingCompany(null)}
                  className="absolute top-8 right-8 p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X />
                </button>
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center font-black text-4xl shadow-xl italic">
                    {viewingCompany.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-4xl font-black tracking-tighter italic">
                      {viewingCompany.name}
                    </h3>
                    <div className="flex gap-4 mt-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">
                        Industry: {viewingCompany.profile.industry}
                      </span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        HQ: {viewingCompany.profile.location}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-12 space-y-8">
                <div>
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">
                    Corporate Mission
                  </h4>
                  <p className="text-slate-600 font-medium leading-relaxed italic">
                    "
                    {viewingCompany.profile.description ||
                      "No corporate description provided."}
                    "
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-100">
                  <div>
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">
                      Lead Recruiter
                    </h4>
                    <p className="font-black text-slate-900">
                      {viewingCompany.profile.hrName}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">
                      Digital Presence
                    </h4>
                    <a
                      href={viewingCompany.profile.website}
                      target="_blank"
                      className="font-black text-blue-600 hover:underline flex items-center gap-2"
                    >
                      <Globe className="w-4 h-4" /> Visit Website
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default StudentDashboard;

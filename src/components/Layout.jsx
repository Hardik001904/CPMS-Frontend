import React, { useState, useRef, useEffect } from "react";
import {
  LogOut,
  User as UserIcon,
  Bell,
  Settings,
  UserCircle,
  CheckCircle,
  Globe,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Activity,
  Linkedin,
  Twitter,
  Github,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";


export const Sidebar = ({ title, items, onLogout, userName, role }) => (
  <aside className="w-64 bg-slate-900 text-white min-h-screen fixed left-0 top-0 flex flex-col z-20 shadow-xl">
    <div className="p-6 border-b border-slate-800 flex items-center gap-3">
      <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold">
        P
      </div>
      <h1 className="text-xl font-bold tracking-tight">{title}</h1>
    </div>

    <nav className="flex-1 p-4 mt-4">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">
        Navigation
      </p>
      <ul className="space-y-1">
        {items.map((item, idx) => (
          <li key={idx}>
            <button
              onClick={item.onClick}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                item.active
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>

    <div className="p-4 border-t border-slate-800 bg-slate-900/50">
      <div className="flex items-center gap-3 px-2 mb-4">
        <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center border border-slate-600 shadow-inner">
          <UserIcon className="w-5 h-5 text-slate-300" />
        </div>
        <div className="overflow-hidden">
          <p className="text-sm font-semibold truncate text-white">
            {userName}
          </p>
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
            {role}
          </p>
        </div>
      </div>
      <button
        onClick={onLogout}
        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-slate-800 hover:bg-red-600 transition-all text-slate-300 text-sm font-semibold border border-transparent"
      >
        <LogOut className="w-4 h-4" />
        Sign Out
      </button>
    </div>
  </aside>
);

export const DashboardHeader = ({ title, subtitle, user, onLogout }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      )
        setShowNotifications(false);
      if (profileRef.current && !profileRef.current.contains(event.target))
        setShowProfileMenu(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getInitials = (name) => {
    if (!name) return "NA";

    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
      <div>
        <h2 className="text-lg font-bold text-slate-900 leading-tight uppercase tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs text-slate-500 font-medium">{subtitle}</p>
        )}
      </div>
      <div className="flex items-center gap-4">
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className={`p-2 rounded-full transition-all relative ${showNotifications ? "bg-blue-50 text-blue-600" : "text-slate-400 hover:bg-slate-50"}`}
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 animate-in fade-in duration-200">
              <div className="p-4 bg-slate-50/50 border-b border-slate-50 flex justify-between items-center">
                <h3 className="font-bold text-sm">Notifications</h3>
                <span className="text-[10px] bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-bold">
                  LATEST
                </span>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {user?.role === UserRole.COMPANY && user?.isApproved && (
                  <div className="p-4 bg-emerald-50 hover:bg-emerald-100/50 transition-colors border-b border-emerald-100 cursor-pointer">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <p className="text-sm font-bold text-emerald-900">
                        Verification Successful
                      </p>
                    </div>
                    <p className="text-xs text-emerald-700">
                      Admin gave approval now you can hire into the site.
                    </p>
                  </div>
                )}
                <div className="p-4 hover:bg-slate-50 transition-colors border-b border-slate-50">
                  <p className="text-sm font-bold text-slate-800">
                    System Ready
                  </p>
                  <p className="text-xs text-slate-500">
                    Welcome to Batch 2026 Portal.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="h-8 w-px bg-slate-200 mx-1"></div>

        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-3 p-1 rounded-full hover:bg-slate-100 transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-600/20">
              {user ? getInitials(user.name) : <UserIcon className="w-5 h-5" />}
            </div>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50">
              <div className="p-4 bg-slate-50 border-b border-slate-100">
                <p className="text-sm font-bold text-slate-900">{user?.name}</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {user?.role}
                </p>
              </div>
              <div className="p-2  ">
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all text-left">
                  <UserCircle className="w-4 h-4" /> Profile
                </button>
                <button
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all text-left"
                  onClick={() =>
                    navigate(`/dashboard/${user?.role?.toLowerCase()}/settings`)
                  }
                >
                  <Settings className="w-4 h-4" /> Settings
                </button>
                <div className="h-px bg-slate-100 my-1" />
                <button
                  onClick={onLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-all text-left"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export const Footer = () => (
  <footer className="bg-[#0a0f1d] text-slate-400 py-20 font-sans border-t border-slate-800">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
        {/* Brand Column */}
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl  shadow-[0_0_20px_rgba(37,99,235,0.3)]">
              P
            </div>
            <span className="text-2xl font-black tracking-tighter text-white ">
              PlacementPro
            </span>
          </Link>
          <p className="text-sm leading-relaxed font-medium">
            Empowering the next generation of industry leaders. We bridge the
            gap between academic brilliance and corporate excellence.
          </p>
          <div className="flex gap-4 pt-2">
            <a
              href="#"
              className="p-2.5 bg-slate-800 rounded-xl hover:bg-blue-600 hover:text-white transition-all"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="p-2.5 bg-slate-800 rounded-xl hover:bg-blue-600 hover:text-white transition-all"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="p-2.5 bg-slate-800 rounded-xl hover:bg-blue-600 hover:text-white transition-all"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Column 2: Students */}
        <div className="space-y-6">
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500">
            For Students
          </h4>
          <ul className="space-y-3">
            {[
              "Browse Jobs",
              "Build Persona",
              "Placement Guides",
              "Career Guidance",
            ].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="text-sm font-bold hover:text-white transition-colors flex items-center gap-2 group"
                >
                  {item}{" "}
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Corporate */}
        <div className="space-y-6">
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500">
            For Partners
          </h4>
          <ul className="space-y-3">
            {[
              "Host a Drive",
              "Talent Search",
              "Placement Reports",
              "Recruiter FAQ",
            ].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="text-sm font-bold hover:text-white transition-colors flex items-center gap-2 group"
                >
                  {item}{" "}
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Reach Us */}
        <div className="space-y-6">
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500">
            Contact Desk
          </h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-slate-600 flex-shrink-0" />
              <p className="text-sm font-medium">
                Placement Cell, Block A, Institutional Area, 380001
              </p>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-slate-600" />
              <p className="text-sm font-medium">support@placementpro.edu</p>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-slate-600" />
              <p className="text-sm font-medium">+91 079 2345 6789</p>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright Section */}
      <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[11px] font-black uppercase tracking-widest text-slate-600">
          &copy; 2026 Campus Placement Management System
        </p>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/5 border border-emerald-500/20 rounded-full">
            <Activity className="w-3 h-3 text-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">
              System Operational
            </span>
          </div>
          <div className="flex gap-6 text-[11px] font-black uppercase tracking-widest text-slate-600">
            <a href="#" className="hover:text-blue-500 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-blue-500 transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

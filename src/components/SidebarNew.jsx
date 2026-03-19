import React, { useState, useRef, useEffect } from "react";
import {
  LogOut,
  User as UserIcon,
  Bell,
  Settings,
  UserCircle,
  CheckCircle,
  Linkedin,
  Twitter,
  Github,
  Globe,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Activity,
  Menu,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

/* ===================== SIDEBAR ===================== */

export const SidebarNew = ({
  title,
  items,
  onLogout,
  userName,
  role,
  isCollapsed,
  setIsCollapsed,
}) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden fixed top-4 left-4 z-[60] p-3 bg-blue-600 text-white rounded-xl shadow-lg"
      >
        {isMobileOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Menu className="w-5 h-5" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`bg-[#0a0f1d] text-white h-screen fixed left-0 top-0 flex flex-col z-50 transition-all duration-500 border-r border-white/5
          ${isCollapsed ? "w-20" : "w-72"}
          ${isMobileOpen ? "translate-x-0 w-72" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Header */}
        <div
          className={`p-6 border-b border-white/5 flex items-center ${
            isCollapsed ? "justify-center" : "gap-4"
          }`}
        >
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black text-xl  shadow-lg"
          >
            P
          </button>
          {!isCollapsed && (
            <h1 className="text-xl font-black ">{title}</h1>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 mt-4 space-y-8 overflow-y-auto">
          <ul className="space-y-2">
            {items.map((item, idx) => (
              <li key={idx}>
                <button
                  onClick={() => {
                    item.onClick();
                    if (window.innerWidth < 768) setIsMobileOpen(false);
                  }}
                  className={`w-full flex items-center gap-4 px-3 py-3 rounded-2xl transition-all
                    ${
                      item.active
                        ? "bg-blue-600/10 text-blue-400"
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                    }`}
                >
                  {item.icon}
                  {!isCollapsed && (
                    <span className="font-bold text-sm">{item.label}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center">
              <UserIcon className="w-5 h-5 text-slate-400" />
            </div>
            {!isCollapsed && (
              <div>
                <p className="text-sm font-black">{userName}</p>
                <p className="text-[10px] text-blue-500 uppercase">{role}</p>
              </div>
            )}
          </div>

          <button
            onClick={onLogout}
            className="w-full py-3 rounded-xl bg-white/5 hover:bg-rose-600/20 text-slate-400 text-xs font-black uppercase"
          >
            <LogOut className="w-4 h-4 inline mr-2" />
            {!isCollapsed && "Sign Out"}
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
};

/* ===================== DASHBOARD HEADER ===================== */

export const DashboardHeader = ({ title, subtitle, user, onLogout }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target)
      )
        setShowNotifications(false);
      if (profileRef.current && !profileRef.current.contains(e.target))
        setShowProfileMenu(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getInitials = (name = "") =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  return (
    <header className="h-20 bg-white/80 backdrop-blur-xl border-b flex items-center justify-between px-8 sticky top-0 z-40">
      <div>
        <h2 className="text-xl font-black  uppercase">{title}</h2>
        {subtitle && (
          <p className="text-[10px] text-slate-500 uppercase">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-6">
        {/* Notifications */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-3 rounded-2xl bg-slate-50 border hover:bg-slate-100"
          >
            <Bell className="w-5 h-5" />
          </button>
        </div>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-3 p-2 bg-slate-900 text-white rounded-2xl"
          >
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black">
              {getInitials(user?.name)}
            </div>
            <span className="hidden lg:block text-sm">
              {user?.name?.split(" ")[0]}
            </span>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-4 w-56 bg-white rounded-2xl shadow-lg border">
              <button
                onClick={() => {
                  sessionStorage.removeItem("token");
                  sessionStorage.removeItem("user");
                  onClose();
                  navigate("/");
                }}
                className="w-full px-4 py-3 text-rose-600 font-black hover:bg-rose-50 text-left"
              >
                <LogOut className="w-4 h-4 inline mr-2" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};



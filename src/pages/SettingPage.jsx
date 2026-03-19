import React, { useState } from "react";
import { DashboardHeader } from "../components/Layout";
import { useNavigate } from "react-router-dom";
// import { userService } from "../services/userService";
import {
  Settings as SettingsIcon,
  ShieldCheck,
  Lock,
  User as UserIcon,
  Mail,
  Bell,
  Eye,
  EyeOff,
  Save,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Briefcase,
  Building2,
} from "lucide-react";
import { SidebarNew } from "../components/SidebarNew";
import { changePassword, deleteAccount } from "../services/authService";

export const UserRole = {
  STUDENT: "STUDENT",
  COMPANY: "COMPANY",
  ADMIN: "ADMIN",
};

export default function SettingPage({ user, onLogout }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState(null);

  const getSidebarItems = () => {
    const base = "/dashboard/" + user.role.toLowerCase();
    if (user.role === UserRole.ADMIN) {
      return [
        {
          icon: <ShieldCheck className="w-5 h-5" />,
          label: "Overview",
          active: false,
          onClick: () => navigate(base + "/overview"),
        },
        {
          icon: <SettingsIcon className="w-5 h-5" />,
          label: "Settings",
          active: true,
          onClick: () => {},
        },
      ];
    } else if (user.role === UserRole.STUDENT) {
      return [
        {
          icon: <Briefcase className="w-5 h-5" />,
          label: "Overview",
          active: false,
          onClick: () => navigate(base + "/overview"),
        },
        {
          icon: <SettingsIcon className="w-5 h-5" />,
          label: "Settings",
          active: true,
          onClick: () => {},
        },
      ];
    } else {
      return [
        {
          icon: <Building2 className="w-5 h-5" />,
          label: "Overview",
          active: false,
          onClick: () => navigate(base + "/overview"),
        },
        {
          icon: <SettingsIcon className="w-5 h-5" />,
          label: "Settings",
          active: true,
          onClick: () => {},
        },
      ];
    }
  };

  //   const handleProfileUpdate = async (e) => {
  //     e.preventDefault();
  //     setIsSaving(true);
  //     setMessage(null);
  //     try {
  //       const updatedUser = await updateProfile({ name: profileData.name, email: profileData.email });
  //       onUpdateUser(updatedUser);
  //       setMessage({ type: 'success', text: 'Profile details updated successfully!' });
  //     } catch (error) {
  //       setMessage({ type: 'error', text: error.message || 'Failed to update profile' });
  //     } finally {
  //       setIsSaving(false);
  //       setTimeout(() => setMessage(null), 3000);
  //     }
  //   };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      setMessage({ type: "error", text: "New passwords do not match!" });
      return;
    }
    setIsSaving(true);
    setMessage(null);
    try {
      await changePassword(passwords.current, passwords.new);
      setMessage({ type: "success", text: "Password changed successfully!" });
      setPasswords({ current: "", new: "", confirm: "" });
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Failed to change password",
      });
    } finally {
      setIsSaving(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleDeleteAccount = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete your account? This action is permanent.",
      )
    )
      return;

    setIsSaving(true);
    try {
      await deleteAccount();
      onLogout();
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Failed to delete account",
      });
      setIsSaving(false);
    }
  };
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-slate-900 italic tracking-tight">
          Account Configuration
        </h2>
        <p className="text-slate-500 font-medium italic">
          Manage your security and personal information.
        </p>
      </div>

      {message && (
        <div
          className={`mb-6 p-4 rounded-2xl flex items-center gap-3 animate-in slide-in-from-top-4 duration-300 ${message.type === "success" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-rose-50 text-rose-600 border border-rose-100"}`}
        >
          {message.type === "success" ? (
            <CheckCircle2 className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          <p className="text-sm font-bold italic">{message.text}</p>
        </div>
      )}

      <div className="space-y-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
              <UserIcon className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-black text-slate-900 italic tracking-tight">
              Personal Information
            </h4>
          </div>

          {/* <form  className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 ml-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        value={profileData.name}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            name: e.target.value,
                          })
                        }
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/10 font-bold text-sm italic"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 ml-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            email: e.target.value,
                          })
                        }
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/10 font-bold text-sm italic"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="bg-slate-900 text-white px-8 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center gap-2 active:scale-95 shadow-lg shadow-slate-900/10"
                  >
                    {isSaving ? (
                      "Processing..."
                    ) : (
                      <>
                        <Save className="w-4 h-4" /> Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form> */}
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600">
              <Lock className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-black text-slate-900 italic tracking-tight">
              Security & Password
            </h4>
          </div>

          <form onSubmit={handlePasswordUpdate} className="space-y-6">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 ml-1">
                Current Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={passwords.current}
                  onChange={(e) =>
                    setPasswords({ ...passwords, current: e.target.value })
                  }
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/10 font-bold text-sm italic"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 ml-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={passwords.new}
                  onChange={(e) =>
                    setPasswords({ ...passwords, new: e.target.value })
                  }
                  placeholder="••••••••"
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/10 font-bold text-sm italic"
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 ml-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={passwords.confirm}
                  onChange={(e) =>
                    setPasswords({ ...passwords, confirm: e.target.value })
                  }
                  placeholder="••••••••"
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/10 font-bold text-sm italic"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="bg-blue-600 text-white px-8 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center gap-2 active:scale-95 shadow-lg shadow-blue-600/20"
              >
                {isSaving ? (
                  "Processing..."
                ) : (
                  <>
                    <Lock className="w-4 h-4" /> Update Password
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="bg-rose-50 p-8 rounded-[2.5rem] border border-rose-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-lg font-black text-rose-900 italic tracking-tight mb-1">
              Danger Zone
            </h4>
            <p className="text-xs text-rose-600 font-medium italic">
              Permanently delete your institutional account and records.
            </p>
          </div>
          <button
            onClick={handleDeleteAccount}
            disabled={isSaving}
            className="bg-rose-600 text-white px-8 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-rose-700 transition-all flex items-center gap-2 active:scale-95 shadow-lg shadow-rose-600/20 disabled:opacity-50"
          >
            <Trash2 className="w-4 h-4" />{" "}
            {isSaving ? "Deleting..." : "Delete Account"}
          </button>
        </div>
      </div>
    </div>
  );
}

// import React, { useState } from "react";
// import { DashboardHeader } from "../components/Layout";
// import { useNavigate } from "react-router-dom";
// import {
//   Settings as SettingsIcon,
//   ShieldCheck,
//   Lock,
//   User as UserIcon,
//   Eye,
//   EyeOff,
//   Trash2,
//   AlertCircle,
//   CheckCircle2,
//   Briefcase,
//   Building2,
// } from "lucide-react";
// import { SidebarNew } from "../components/SidebarNew";
// import { changePassword, deleteAccount } from "../services/authService";

// export default function SettingPage({ user, onLogout }) {
//   const navigate = useNavigate();

//   // 🛡️ Safety check
//   if (!user) return null;

//   const [showPassword, setShowPassword] = useState(false);
//   const [passwords, setPasswords] = useState({
//     current: "",
//     new: "",
//     confirm: "",
//   });
//   const [isSaving, setIsSaving] = useState(false);
//   const [message, setMessage] = useState(null);

//   const getSidebarItems = () => {
//     const base = "/dashboard/" + user.role.toLowerCase();

//     if (user.role === "ADMIN") {
//       return [
//         {
//           icon: <ShieldCheck className="w-5 h-5" />,
//           label: "Overview",
//           onClick: () => navigate(base + "/overview"),
//         },
//         {
//           icon: <SettingsIcon className="w-5 h-5" />,
//           label: "Settings",
//           active: true,
//         },
//       ];
//     }

//     if (user.role === "STUDENT") {
//       return [
//         {
//           icon: <Briefcase className="w-5 h-5" />,
//           label: "Overview",
//           onClick: () => navigate(base + "/overview"),
//         },
//         {
//           icon: <SettingsIcon className="w-5 h-5" />,
//           label: "Settings",
//           active: true,
//         },
//       ];
//     }

//     return [
//       {
//         icon: <Building2 className="w-5 h-5" />,
//         label: "Overview",
//         onClick: () => navigate(base + "/overview"),
//       },
//       {
//         icon: <SettingsIcon className="w-5 h-5" />,
//         label: "Settings",
//         active: true,
//       },
//     ];
//   };

//   // 🔐 Change Password
//   const handlePasswordUpdate = async (e) => {
//     e.preventDefault();

//     if (passwords.new !== passwords.confirm) {
//       setMessage({ type: "error", text: "Passwords do not match!" });
//       return;
//     }

//     try {
//       setIsSaving(true);
//       await changePassword(passwords.current, passwords.new);

//       setMessage({ type: "success", text: "Password updated successfully!" });
//       setPasswords({ current: "", new: "", confirm: "" });

//     } catch (error) {
//       setMessage({
//         type: "error",
//         text: error.message || "Failed to update password",
//       });
//     } finally {
//       setIsSaving(false);
//       setTimeout(() => setMessage(null), 3000);
//     }
//   };

//   // 🗑️ Delete Account
//   const handleDeleteAccount = async () => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete your account?"
//     );
//     if (!confirmDelete) return;

//     try {
//       setIsSaving(true);
//       await deleteAccount();
//       onLogout();
//     } catch (error) {
//       setMessage({
//         type: "error",
//         text: error.message || "Failed to delete account",
//       });
//       setIsSaving(false);
//     }
//   };

//   return (

//         <div className="p-6 max-w-3xl mx-auto space-y-6">

//           {/* Message */}
//           {message && (
//             <div
//               className={`p-4 rounded-xl flex items-center gap-2 ${
//                 message.type === "success"
//                   ? "bg-green-100 text-green-600"
//                   : "bg-red-100 text-red-600"
//               }`}
//             >
//               {message.type === "success" ? (
//                 <CheckCircle2 />
//               ) : (
//                 <AlertCircle />
//               )}
//               {message.text}
//             </div>
//           )}

//           {/* 🔐 Change Password */}
//           <div className="bg-white p-6 rounded-xl shadow">
//             <h3 className="font-bold mb-4">Change Password</h3>

//             <form onSubmit={handlePasswordUpdate} className="space-y-4">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Current Password"
//                 value={passwords.current}
//                 onChange={(e) =>
//                   setPasswords({ ...passwords, current: e.target.value })
//                 }
//                 className="w-full p-3 border rounded"
//               />

//               <input
//                 type="password"
//                 placeholder="New Password"
//                 value={passwords.new}
//                 onChange={(e) =>
//                   setPasswords({ ...passwords, new: e.target.value })
//                 }
//                 className="w-full p-3 border rounded"
//               />

//               <input
//                 type="password"
//                 placeholder="Confirm Password"
//                 value={passwords.confirm}
//                 onChange={(e) =>
//                   setPasswords({ ...passwords, confirm: e.target.value })
//                 }
//                 className="w-full p-3 border rounded"
//               />

//               <button
//                 type="submit"
//                 disabled={isSaving}
//                 className="bg-blue-600 text-white px-4 py-2 rounded"
//               >
//                 {isSaving ? "Updating..." : "Update Password"}
//               </button>
//             </form>
//           </div>

//           {/* 🗑️ Delete Account */}
//           <div className="bg-red-50 p-6 rounded-xl">
//             <h3 className="font-bold text-red-600 mb-2">Danger Zone</h3>

//             <button
//               onClick={handleDeleteAccount}
//               disabled={isSaving}
//               className="bg-red-600 text-white px-4 py-2 rounded"
//             >
//               {isSaving ? "Deleting..." : "Delete Account"}
//             </button>
//           </div>

//         </div>
//   );
// }

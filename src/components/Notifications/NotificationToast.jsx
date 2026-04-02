/**
 * NotificationToast.jsx
 *
 * Shows a toast pop-up in the corner whenever a real-time notification
 * arrives via Socket.io. Uses react-hot-toast (already in your package.json).
 *
 * Usage in App.jsx or main layout:
 *   import { NotificationToastProvider } from './components/Notifications/NotificationToast';
 *   <NotificationToastProvider />
 *
 * Then call:
 *   import { showNotificationToast } from './components/Notifications/NotificationToast';
 *   showNotificationToast(notification); // call this in your socket listener
 */

import toast, { Toaster } from "react-hot-toast";
import {
  Briefcase,
  Star,
  Award,
  XCircle,
  UserPlus,
  Building2,
  CheckCircle,
  Bell,
} from "lucide-react";

const ICON_MAP = {
  JOB_POSTED: { icon: Briefcase, color: "#3b82f6" },
  APPLICATION_SHORTLISTED: { icon: Star, color: "#eab308" },
  APPLICATION_SELECTED: { icon: Award, color: "#22c55e" },
  APPLICATION_REJECTED: { icon: XCircle, color: "#ef4444" },
  STUDENT_APPLIED: { icon: UserPlus, color: "#a855f7" },
  COMPANY_REGISTERED: { icon: Building2, color: "#f97316" },
  STUDENT_SELECTED: { icon: CheckCircle, color: "#22c55e" },
};

/**
 * Renders a custom toast card for a notification.
 * Call this from your socket listener when a new notification arrives.
 */
export function showNotificationToast(notification) {
  const config = ICON_MAP[notification.type] || {
    icon: Bell,
    color: "#6b7280",
  };
  const Icon = config.icon;

  toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-sm w-full bg-white shadow-lg rounded-xl border border-gray-200 flex items-start gap-3 p-4 cursor-pointer`}
        onClick={() => toast.dismiss(t.id)}
        style={{ animation: t.visible ? "slideInRight 0.3s ease-out" : "" }}
      >
        {/* Icon */}
        <div
          className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${config.color}20` }}
        >
          <Icon
            className="w-5 h-5"
            style={{ color: config.color }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900 leading-tight">
            {notification.title}
          </p>
          <p className="text-xs text-gray-500 mt-0.5 leading-snug line-clamp-2">
            {notification.message}
          </p>
        </div>

        {/* Dismiss */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toast.dismiss(t.id);
          }}
          className="flex-shrink-0 text-gray-300 hover:text-gray-500 transition-colors text-lg leading-none"
          aria-label="Dismiss"
        >
          ×
        </button>

        <style>{`
          @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to   { transform: translateX(0); opacity: 1; }
          }
        `}</style>
      </div>
    ),
    {
      duration: 5000,
      position: "top-right",
    }
  );
}

/**
 * Provider: Place this once in App.jsx alongside <Toaster />.
 * (If you already have <Toaster /> from react-hot-toast, just keep one.)
 */
export function NotificationToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 5000,
      }}
    />
  );
}
/**
 * NotificationItem.jsx
 *
 * Individual notification card with icon, message, timestamp, and actions.
 * Supports mark-as-read on click and delete on hover button.
 */

import { formatDistanceToNow } from "date-fns";
import {
  Briefcase,
  CheckCircle,
  XCircle,
  Star,
  UserPlus,
  Building2,
  Award,
  X,
} from "lucide-react";
import { useNotificationStore } from "../../store/notificationStore";

// Map notification type → icon + color
const TYPE_CONFIG = {
  JOB_POSTED: {
    icon: Briefcase,
    bg: "bg-blue-100",
    iconColor: "text-blue-600",
    border: "border-l-blue-500",
  },
  APPLICATION_SHORTLISTED: {
    icon: Star,
    bg: "bg-yellow-100",
    iconColor: "text-yellow-600",
    border: "border-l-yellow-500",
  },
  APPLICATION_SELECTED: {
    icon: Award,
    bg: "bg-green-100",
    iconColor: "text-green-600",
    border: "border-l-green-500",
  },
  APPLICATION_REJECTED: {
    icon: XCircle,
    bg: "bg-red-100",
    iconColor: "text-red-500",
    border: "border-l-red-400",
  },
  STUDENT_APPLIED: {
    icon: UserPlus,
    bg: "bg-purple-100",
    iconColor: "text-purple-600",
    border: "border-l-purple-500",
  },
  COMPANY_REGISTERED: {
    icon: Building2,
    bg: "bg-orange-100",
    iconColor: "text-orange-600",
    border: "border-l-orange-500",
  },
  STUDENT_SELECTED: {
    icon: CheckCircle,
    bg: "bg-green-100",
    iconColor: "text-green-600",
    border: "border-l-green-500",
  },
};

const DEFAULT_CONFIG = {
  icon: Briefcase,
  bg: "bg-gray-100",
  iconColor: "text-gray-500",
  border: "border-l-gray-400",
};

function timeAgo(dateString) {
  try {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  } catch {
    return "just now";
  }
}

export default function NotificationItem({ notification }) {
  const { markAsRead, deleteNotification } = useNotificationStore();
  const config = TYPE_CONFIG[notification.type] || DEFAULT_CONFIG;
  const Icon = config.icon;

  const handleClick = () => {
    if (!notification.isRead) {
      markAsRead(notification._id);
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation(); // Don't trigger the parent click
    deleteNotification(notification._id);
  };

  return (
    <div
      onClick={handleClick}
      className={`
        group relative flex items-start gap-3 px-4 py-3 cursor-pointer
        border-l-4 ${config.border}
        transition-colors duration-150
        ${notification.isRead
          ? "bg-white hover:bg-gray-50"
          : "bg-blue-50/50 hover:bg-blue-50"
        }
      `}
    >
      {/* Icon */}
      <div
        className={`flex-shrink-0 w-9 h-9 rounded-full ${config.bg} flex items-center justify-center mt-0.5`}
      >
        <Icon className={`w-4 h-4 ${config.iconColor}`} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p
            className={`text-sm font-medium leading-tight ${
              notification.isRead ? "text-gray-700" : "text-gray-900"
            }`}
          >
            {notification.title}
          </p>

          {/* Delete button - shows on hover */}
          <button
            onClick={handleDelete}
            className="flex-shrink-0 p-0.5 rounded opacity-0 group-hover:opacity-100 hover:bg-gray-200 transition-opacity"
            aria-label="Delete notification"
          >
            <X className="w-3.5 h-3.5 text-gray-400" />
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-0.5 leading-snug line-clamp-2">
          {notification.message}
        </p>

        <p className="text-[11px] text-gray-400 mt-1">
          {timeAgo(notification.createdAt)}
        </p>
      </div>

      {/* Unread dot */}
      {!notification.isRead && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
      )}
    </div>
  );
}
/**
 * NotificationPanel.jsx
 *
 * Dropdown panel that shows the notification list.
 * Supports infinite scroll, mark-all-read, and clear-read.
 */

import { useEffect, useRef, useCallback } from "react";
import { Check, CheckCheck, Trash2, Bell, Loader2 } from "lucide-react";
import { useNotificationStore } from "../../store/notificationStore";
import NotificationItem from "./NotificationItem";

export default function NotificationPanel({ onClose }) {
  const {
    notifications,
    unreadCount,
    loading,
    hasMore,
    fetchNotifications,
    markAllAsRead,
    clearAllRead,
  } = useNotificationStore();

  const scrollRef = useRef(null);

  // Fetch on first open
  useEffect(() => {
    fetchNotifications(true); // reset = true → refresh from page 1
  }, []);

  // Infinite scroll
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el || loading || !hasMore) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    if (scrollTop + clientHeight >= scrollHeight - 50) {
      fetchNotifications(false); // append next page
    }
  }, [loading, hasMore, fetchNotifications]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.addEventListener("scroll", handleScroll);
    return () => el?.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const hasUnread = unreadCount > 0;
  const hasReadNotifications = notifications.some((n) => n.isRead);

  return (
    <div
      className="absolute right-0 top-full mt-2 w-96 max-h-[520px] bg-white rounded-xl shadow-xl border border-gray-200 flex flex-col overflow-hidden z-50"
      style={{ animation: "slideDown 0.15s ease-out" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-gray-600" />
          <h3 className="font-semibold text-gray-800 text-sm">Notifications</h3>
          {unreadCount > 0 && (
            <span className="px-1.5 py-0.5 text-[10px] font-bold bg-blue-600 text-white rounded-full">
              {unreadCount}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {hasUnread && (
            <button
              onClick={markAllAsRead}
              title="Mark all as read"
              className="flex items-center gap-1 px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>All read</span>
            </button>
          )}
          {hasReadNotifications && (
            <button
              onClick={clearAllRead}
              title="Clear read notifications"
              className="flex items-center gap-1 px-2 py-1 text-xs text-gray-500 hover:bg-gray-100 rounded-md transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Notification List */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto divide-y divide-gray-100"
        style={{ maxHeight: "420px" }}
      >
        {notifications.length === 0 && !loading ? (
          <EmptyState />
        ) : (
          <>
            {notifications.map((notification) => (
              <NotificationItem
                key={notification._id}
                notification={notification}
              />
            ))}

            {/* Loading indicator */}
            {loading && (
              <div className="flex justify-center py-4">
                <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
              </div>
            )}

            {/* End of list */}
            {!hasMore && notifications.length > 0 && (
              <p className="text-center text-xs text-gray-400 py-3">
                You've seen all notifications
              </p>
            )}
          </>
        )}
      </div>

      {/* Footer link */}
      <div className="border-t border-gray-100 px-4 py-2 bg-gray-50">
        <button
          onClick={onClose}
          className="w-full text-center text-xs text-blue-600 hover:text-blue-700 font-medium py-1 transition-colors"
        >
          Close
        </button>
      </div>

      {/* Slide-down animation */}
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-3">
        <Bell className="w-7 h-7 text-gray-400" />
      </div>
      <p className="text-sm font-medium text-gray-600">All caught up!</p>
      <p className="text-xs text-gray-400 mt-1">
        No notifications yet. We'll let you know when something happens.
      </p>
    </div>
  );
}
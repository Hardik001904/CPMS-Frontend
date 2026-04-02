/**
 * NotificationsPage.jsx
 *
 * Full-page notifications view (route: /notifications).
 * Shows all notifications with filter tabs and infinite scroll.
 *
 * Add to your router:
 *   <Route path="/notifications" element={<NotificationsPage />} />
 */

import { useEffect, useRef, useCallback, useState } from "react";
import {
  Bell,
  CheckCheck,
  Trash2,
  Loader2,
  ArrowLeft,
  Filter,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useNotificationStore } from "../store/notificationStore";
import NotificationItem from "../components/Notifications/NotificationItem";

const FILTER_TABS = [
  { key: "all", label: "All" },
  { key: "unread", label: "Unread" },
];

export default function NotificationsPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");
  const scrollSentinelRef = useRef(null);

  const {
    notifications,
    unreadCount,
    loading,
    hasMore,
    fetchNotifications,
    markAllAsRead,
    clearAllRead,
  } = useNotificationStore();

  // Fetch on mount or filter change
  useEffect(() => {
    fetchNotifications(true);
  }, [activeFilter]);

  // Intersection Observer for infinite scroll
  const handleObserver = useCallback(
    (entries) => {
      const [target] = entries;
      if (target.isIntersecting && hasMore && !loading) {
        fetchNotifications(false);
      }
    },
    [hasMore, loading, fetchNotifications]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { threshold: 0 });
    const el = scrollSentinelRef.current;
    if (el) observer.observe(el);
    return () => el && observer.unobserve(el);
  }, [handleObserver]);

  const filtered =
    activeFilter === "unread"
      ? notifications.filter((n) => !n.isRead)
      : notifications;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex items-center gap-3 py-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-semibold text-gray-900">
                  Notifications
                </h1>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 text-xs font-bold bg-red-500 text-white rounded-full">
                    {unreadCount}
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
                >
                  <CheckCheck className="w-4 h-4" />
                  Mark all read
                </button>
              )}
              <button
                onClick={clearAllRead}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                title="Clear read notifications"
              >
                <Trash2 className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-1 pb-0">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key)}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeFilter === tab.key
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
                {tab.key === "unread" && unreadCount > 0 && (
                  <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-bold bg-blue-100 text-blue-700 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto">
        {filtered.length === 0 && !loading ? (
          <EmptyState filter={activeFilter} />
        ) : (
          <div className="bg-white mt-2 rounded-xl border border-gray-200 divide-y divide-gray-100 overflow-hidden shadow-sm">
            {filtered.map((notification) => (
              <NotificationItem
                key={notification._id}
                notification={notification}
              />
            ))}

            {/* Infinite scroll sentinel */}
            <div ref={scrollSentinelRef} className="h-2" />

            {loading && (
              <div className="flex justify-center py-6">
                <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
              </div>
            )}

            {!hasMore && filtered.length > 0 && (
              <p className="text-center text-xs text-gray-400 py-4">
                You've seen all notifications
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyState({ filter }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Bell className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-base font-semibold text-gray-700 mb-1">
        {filter === "unread" ? "No unread notifications" : "No notifications yet"}
      </h3>
      <p className="text-sm text-gray-400 max-w-xs">
        {filter === "unread"
          ? "You're all caught up! Switch to 'All' to see past notifications."
          : "When companies post jobs or update your application, you'll see it here."}
      </p>
    </div>
  );
}
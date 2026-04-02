/**
 * notificationStore.js
 *
 * Global state for notifications using Zustand.
 * Handles both REST-fetched and real-time socket notifications.
 *
 * Install: npm install zustand
 */

import { create } from "zustand";
import axios from "../services/axios";

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const useNotificationStore = create((set, get) => ({
  notifications: [],
  unreadCount: 0,
  loading: false,
  hasMore: true,
  page: 1,

  // ── Actions ──────────────────────────────────────────────────────────────

  /**
   * Fetch paginated notifications from the server.
   * Append to existing list (infinite scroll).
   */
  fetchNotifications: async (reset = false) => {
    const { page, loading, hasMore } = get();
    if (loading || (!hasMore && !reset)) return;

    const currentPage = reset ? 1 : page;

    set({ loading: true });

    try {
      const response = await axios.get(`/notifications`, {
        params: { page: currentPage, limit: 15 },
      });

      const { data, pagination, unreadCount } = response.data;

      set((state) => ({
        notifications: reset ? data : [...state.notifications, ...data],
        unreadCount,
        page: currentPage + 1,
        hasMore: pagination.hasMore,
        loading: false,
      }));
    } catch (error) {
      console.error("Fetch notifications error:", error);
      set({ loading: false });
    }
  },

  /**
   * Fetch just the unread count (for badge updates).
   */
  fetchUnreadCount: async () => {
    try {
      const response = await axios.get(`/notifications/unread-count`)
      console.log("fetchUnreadCount : ",response)
      set({ unreadCount: response.data.unreadCount });
    } catch (error) {
      console.error("Fetch unread count error:", error);
    }
  },

  /**
   * Add a new notification from socket to the top of the list.
   */
  addNotification: (notification) => {
    set((state) => ({
      notifications: [notification, ...state.notifications],
    }));
  },

  /**
   * Increment unread count (called alongside addNotification from socket).
   */
  incrementUnread: () => {
    set((state) => ({ unreadCount: state.unreadCount + 1 }));
  },

  /**
   * Mark a single notification as read.
   */
  markAsRead: async (notificationId) => {
    try {
      await axios.patch(
        `/notifications/${notificationId}/read`,
        {},
      );

      set((state) => {
        const updated = state.notifications.map((n) =>
          n._id === notificationId ? { ...n, isRead: true } : n
        );
        const wasUnread = state.notifications.find(
          (n) => n._id === notificationId && !n.isRead
        );
        return {
          notifications: updated,
          unreadCount: wasUnread
            ? Math.max(0, state.unreadCount - 1)
            : state.unreadCount,
        };
      });
    } catch (error) {
      console.error("Mark as read error:", error);
    }
  },

  /**
   * Mark ALL notifications as read.
   */
  markAllAsRead: async () => {
    try {
      await axios.patch(
        `/notifications/read-all`,
        {},
      );

      set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
        unreadCount: 0,
      }));
    } catch (error) {
      console.error("Mark all as read error:", error);
    }
  },

  /**
   * Delete a single notification.
   */
  deleteNotification: async (notificationId) => {
    try {
      await axios.delete(`/notifications/${notificationId}`);

      set((state) => {
        const notif = state.notifications.find((n) => n._id === notificationId);
        return {
          notifications: state.notifications.filter(
            (n) => n._id !== notificationId
          ),
          unreadCount:
            notif && !notif.isRead
              ? Math.max(0, state.unreadCount - 1)
              : state.unreadCount,
        };
      });
    } catch (error) {
      console.error("Delete notification error:", error);
    }
  },

  /**
   * Clear all read notifications.
   */
  clearAllRead: async () => {
    try {
      await axios.delete(`/notifications/clear-all`);

      set((state) => ({
        notifications: state.notifications.filter((n) => !n.isRead),
      }));
    } catch (error) {
      console.error("Clear all read error:", error);
    }
  },

  /**
   * Reset store (call on logout).
   */
  reset: () => {
    set({
      notifications: [],
      unreadCount: 0,
      loading: false,
      hasMore: true,
      page: 1,
    });
  },
}));
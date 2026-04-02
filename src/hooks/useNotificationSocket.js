/**
 * useNotificationSocket.js  (FINAL VERSION - with toast)
 *
 * Connects to Socket.io, receives real-time notifications,
 * updates Zustand store, shows toast pop-up, and triggers
 * browser push notifications.
 *
 * Place useNotificationSocket() inside your authenticated layout:
 *
 *   function AuthenticatedLayout() {
 *     useNotificationSocket();
 *     return <Outlet />;
 *   }
 */

import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useNotificationStore } from "../store/notificationStore";
import { showNotificationToast } from "../components/Notifications/NotificationToast";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:3000";

export function useNotificationSocket() {
  const socketRef = useRef(null);
  const { addNotification, incrementUnread, fetchUnreadCount } =
    useNotificationStore();

  useEffect(() => {
    // const token = sessionStorage.getItem("token");
    // CHANGE to whatever key your app actually uses, e.g.:
    const token =
      sessionStorage.getItem("token") ||
      sessionStorage.getItem("authToken") ||
      sessionStorage.getItem("jwt");
    if (!token) return;

    const socket = io(SOCKET_URL, {
      auth: { token },
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 10000,
    });

    socketRef.current = socket;
    console.log("socket : ", socket);

    socket.on("connect", () => {
      console.log("[Socket] Connected:", socket.id);
      // Re-sync unread count on reconnect (catches missed notifications)
      fetchUnreadCount();
    });

    // socket.on("connected", ({ userId, role }) => {
    //   console.log(`[Socket] Authenticated as ${role} (${userId})`);
    // });

    socket.on("connected", ({ userId, role }) => {
      console.log(`[Socket] ✅ Connected as ${role} - userId: ${userId}`);
      // This userId MUST match what the backend emits to
    });
    // ── Main notification handler ──────────────────────────────────────────
    socket.on("notification:new", (notification) => {
         console.log("[Socket] 📬 Notification received:", notification);
      // 1. Add to global store (notification list + badge)
      addNotification(notification);
      incrementUnread();

      // 2. Show toast pop-up in the corner
      showNotificationToast(notification);

      // 3. Browser push notification (when app is in background)
      if (
        typeof window !== "undefined" &&
        "Notification" in window &&
        Notification.permission === "granted" &&
        document.visibilityState === "hidden"
      ) {
        new Notification(notification.title, {
          body: notification.message,
          icon: "/favicon.ico",
          tag: notification._id, // Prevent duplicates
          renotify: true,
        });
      }
    });

    // socket.on("connect_error", (err) => {
    //   console.error("[Socket] Connection error:", err.message);
    // });
    socket.on("connect_error", (err) => {
      console.error("[Socket] ❌ Connection FAILED:", err.message);
    });

    socket.on("disconnect", (reason) => {
      console.warn("[Socket] Disconnected:", reason);
    });

    // Request browser notification permission on first load
    if (
      typeof window !== "undefined" &&
      "Notification" in window &&
      Notification.permission === "default"
    ) {
      Notification.requestPermission().then((perm) => {
        console.log("[Notifications] Permission:", perm);
      });
    }

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, []); // Only once on mount

  return socketRef;
}

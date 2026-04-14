// ============================================================
// FRONTEND SESSION MANAGEMENT — Netflix-style single login
// ============================================================
// Drop this into a file like: src/utils/sessionManager.js
// Works with React (or any JS framework).
// ============================================================

import axios from "axios";

const API = import.meta.env.VITE_API_URL; // or process.env.REACT_APP_API_URL

// ── 1. AXIOS INTERCEPTOR — handle session errors globally ──────────────────
//
// Add this once at app startup (e.g. in main.jsx or App.jsx).
// It catches SESSION_ENDED and SESSION_INACTIVE from any API call
// and redirects to /login automatically.

export function setupAxiosInterceptors(navigate, showToast) {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      const msg = error?.response?.data?.message;

      if (msg === "SESSION_ENDED") {
        // Kicked by another device login (takeover)
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        showToast("Your session was ended because someone logged in from another device.");
        navigate("/login");
      }

      if (msg === "SESSION_INACTIVE") {
        // 15 min inactivity logout
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        showToast("You were logged out due to inactivity.");
        navigate("/login");
      }

      return Promise.reject(error);
    }
  );
}

// ── 2. LOGIN FUNCTION — handles SESSION_CONFLICT (409) ────────────────────
//
// Call this from your Login page's submit handler.
// onConflict: callback that receives { device, browser, ip, lastActive }
//             — use it to show a dialog "Someone is logged in on X. Continue?"
// onSuccess: callback after successful login

export async function loginUser({ email, password, role, confirmTakeover = false }) {
  const response = await axios.post(`${API}/api/auth/login`, {
    email,
    password,
    role,
    confirmTakeover,
  });
  return response.data;
}

// ── 3. PING — heartbeat for idle screens ──────────────────────────────────
//
// The backend's authMiddleware updates lastActive on EVERY API request.
// So if the user is actively using the app (navigating, clicking), the
// session stays alive automatically.
//
// BUT — if the user has a page open and is just READING (no API calls),
// you need to ping every ~4 minutes to prevent the 15-min inactivity logout.
//
// Start this when the user logs in. Stop it on logout.

let pingInterval = null;

export function startHeartbeat(token) {
  stopHeartbeat(); // Clear any existing interval first

  pingInterval = setInterval(async () => {
    try {
      await axios.get(`${API}/api/auth/ping`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      // If ping fails with 401, the interceptor above handles logout
      console.warn("Heartbeat ping failed:", err?.response?.data?.message);
    }
  }, 4 * 60 * 1000); // Every 4 minutes (well within the 15-min limit)
}

export function stopHeartbeat() {
  if (pingInterval) {
    clearInterval(pingInterval);
    pingInterval = null;
  }
}

// ── 4. SOCKET — real-time kick notification ────────────────────────────────
//
// Connect socket after login. Listen for SESSION_KICKED.
// This gives the kicked-out device an INSTANT popup instead of
// waiting for their next API call to return a 401.

import { io } from "socket.io-client";

let socket = null;

export function connectSocket(token, onKicked) {
  socket = io(API, {
    auth: { token },
    reconnectionAttempts: 5,
  });

  socket.on("connect", () => {
    console.log("Socket connected");
  });

  socket.on("notification:new", (payload) => {
    if (payload.type === "SESSION_KICKED") {
      // Immediately clear local auth and call the handler
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      stopHeartbeat();
      socket.disconnect();
      onKicked(payload.message);
    }
  });

  socket.on("disconnect", (reason) => {
    console.log("Socket disconnected:", reason);
  });
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}

// ── 5. LOGOUT ──────────────────────────────────────────────────────────────


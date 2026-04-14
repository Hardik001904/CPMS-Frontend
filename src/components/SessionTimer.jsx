// ============================================================
// SessionTimer.jsx — FIXED VERSION
// ============================================================
// BUGS FIXED:
// 1. Timer now resets on ANY user activity (mousemove, keydown, click, scroll)
// 2. Timer shares the same activity events as App.jsx — no more two timers fighting
// 3. Shows a warning dialog at 2 minutes left instead of sudden logout
// 4. Cleanup is correct — no stale closures
// ============================================================

import { useEffect, useState, useRef, useCallback } from "react";

const INACTIVE_LIMIT = 15 * 60; // 15 minutes in seconds
const WARN_AT = 2 * 60;         // Show warning at 2 minutes remaining

const SessionTimer = ({ onExpire }) => {
  const [timeLeft, setTimeLeft] = useState(INACTIVE_LIMIT);
  const [showWarning, setShowWarning] = useState(false);
  const timeLeftRef = useRef(INACTIVE_LIMIT); // ref avoids stale closure in listeners

  const resetTimer = useCallback(() => {
    timeLeftRef.current = INACTIVE_LIMIT;
    setTimeLeft(INACTIVE_LIMIT);
    setShowWarning(false);
  }, []);

  useEffect(() => {
    // Countdown tick every second
    const interval = setInterval(() => {
      timeLeftRef.current -= 1;
      const remaining = timeLeftRef.current;

      setTimeLeft(remaining);

      if (remaining <= WARN_AT && remaining > 0) {
        setShowWarning(true);
      }

      if (remaining <= 0) {
        clearInterval(interval);
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        if (onExpire) onExpire();
      }
    }, 1000);

    // Reset timer on any user activity
    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
    events.forEach((e) => window.addEventListener(e, resetTimer, { passive: true }));

    return () => {
      clearInterval(interval);
      events.forEach((e) => window.removeEventListener(e, resetTimer));
    };
  }, [resetTimer, onExpire]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isWarning = timeLeft <= WARN_AT;

  return (
    <>
      {/* Timer Badge */}
      <div
        title="Session timeout countdown — resets on activity"
        className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
          isWarning
            ? "bg-red-50 text-red-600 animate-pulse"
            : "bg-green-100 text-green-600"
        }`}
      >
        {minutes}:{seconds < 10 ? "0" : ""}
        {seconds}
      </div>

      {/* Warning Modal at 2 minutes remaining */}
      {showWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 text-center space-y-4">
            <div className="text-5xl">⏰</div>
            <h2 className="text-xl font-bold text-gray-800">
              Session Expiring Soon
            </h2>
            <p className="text-gray-500 text-sm">
              You'll be logged out in{" "}
              <span className="font-bold text-red-600">
                {minutes}:{seconds < 10 ? "0" : ""}
                {seconds}
              </span>{" "}
              due to inactivity.
            </p>
            <button
              onClick={resetTimer}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all"
            >
              Stay Logged In
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SessionTimer;
// import { useEffect, useState } from "react";

// const SessionTimer = () => {
//   const INACTIVE_LIMIT = 15 * 60; // seconds
//   const [timeLeft, setTimeLeft] = useState(INACTIVE_LIMIT);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           sessionStorage.removeItem("token");
//           window.location.href = "/session-expired";
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   const minutes = Math.floor(timeLeft / 60);
//   const seconds = timeLeft % 60;

//   return (
//     <div className="px-3 py-1 bg-red-50 text-red-600 rounded-lg text-xs font-bold">
//       {minutes}:{seconds < 10 ? "0" : ""}
//       {seconds}
//     </div>
//   );
// };

// export default SessionTimer;
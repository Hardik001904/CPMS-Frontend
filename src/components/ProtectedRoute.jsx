// src/components/ProtectedRoute.tsx
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const token = sessionStorage.getItem("token");
  //   console.log("token inside protected", token);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    // console.log("inside try block");
    const decoded = jwtDecode(token);
    // console.log("decode ",decoded);
    
    //  CHECK TOKEN EXPIRY
    const currentTime = Date.now() / 1000; // in seconds

    if (decoded.exp < currentTime) {
      sessionStorage.removeItem("token");
      console.log("ProtectedRoute",currentTime,decoded.exp);
      return <Navigate to="/session-expired" replace />;
    }

    // Redirect to their respective dashboard if they try to access unauthorized areas
    if (!allowedRoles.includes(decoded.role)) {
      const defaultRedirect =
        decoded.role === "ADMIN"
          ? "/dashboard/admin"
          : decoded.role === "COMPANY"
            ? "/dashboard/company"
            : "/dashboard/student";

      return <Navigate to={defaultRedirect} replace />;
    }

    return children;
  } catch (error) {
    sessionStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;

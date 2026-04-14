// context/AuthContext.jsx

import { createContext, useContext, useState, useEffect } from "react";
import { fetchUserById, logoutUser } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const fetchUser = async () => {
    try {
      const token = sessionStorage.getItem("token");

      // 🚫 STOP if no token
      if (!token) {
        setUser(null);
        setLoadingUser(false);
        return;
      }

      setLoadingUser(true);

      const res = await fetchUserById();
      setUser(res?.user);
    } catch (err) {
      console.log("User not logged in");
      setUser(null);
    } finally {
      setLoadingUser(false);
    }
  };

  // ✅ ADD THIS 🔥
  const logout = () => {
    logoutUser(); // clear user
  };

  // ✅ THIS MUST BE OUTSIDE FUNCTION
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, loadingUser, logout, refetch: fetchUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ ALSO OUTSIDE
export const useAuth = () => useContext(AuthContext);

// context/AuthContext.jsx

import { createContext, useContext, useState, useEffect } from "react";
import { fetchUserById, logoutUser } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  // const [loadingUser, setLoadingUser] = useState(
  //   () => !!sessionStorage.getItem("token"), // true only if token exists
  // );
  const fetchUser = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        setUser(null);
        setLoadingUser(false);
        return;
      }
      setLoadingUser(true);
      const res = await fetchUserById();
      console.log("Auth API Response:", res); // What does this print?
      setUser(res?.user); // If res.user is undefined, user becomes undefined/null
    } catch (err) {
      console.log("User not logged in"); // Is this printing?
      setUser(null);
    } finally {
      setLoadingUser(false);
    }
  };
  // const fetchUser = async () => {
  //   try {
  //     // const token = sessionStorage.getItem("token");

  //     // 🚫 STOP if no token
  //     if (!token) {
  //       setUser(null);
  //       setLoadingUser(false);
  //       return;
  //     }

  //     setLoadingUser(true);

  //     const res = await fetchUserById();
  //     console.log("Auth API Response:", res);
  //     setUser(res?.user);
  //   } catch (err) {
  //     console.log("User not logged in");
  //     setUser(null);
  //   } finally {
  //     setLoadingUser(false);
  //   }
  // };

  // ✅ ADD THIS 🔥
  const logout = () => {
    logoutUser(); // clear user
  };

  // ✅ THIS MUST BE OUTSIDE FUNCTION
  useEffect(() => {
    const retry = setTimeout(() => {
      if (!user) {
        console.log("Retrying fetchUser...");
        fetchUser();
      }
    }, 3000);
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

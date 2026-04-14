import { data } from "react-router-dom";
import axios from "./axios";
import { disconnectSocket, stopHeartbeat } from "../../utils/sessionManager";

export const login = async (data) => {
  try {
    const res = await axios.post("/auth/login", data);
    sessionStorage.setItem("token", res.data.token);
    // sessionStorage.setItem("user", JSON.stringify(res.data.user));
    return res;
  } catch (error) {
    console.log(" Login Failed", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const res = await axios.post("/auth/logout", data);
    return res;
    // await axios.post(
    //   `${API}/api/auth/logout`,
    //   {},
    //   { headers: { Authorization: `Bearer ${token}` } }
    // );
  } catch (_) {
    // Even if request fails, clear local state
  } finally {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    stopHeartbeat();
    disconnectSocket();
  }
};
export const register = async (data) => {
  try {
    const res = await axios.post("/auth/register/student", data);
    return res;
  } catch (error) {
    console.log("Register Failed", error);
    throw error;
  }
};

export const registercompany = async (data) => {
  try {
    const res = await axios.post("/auth/register/company", data);
    return res;
  } catch (error) {
    throw error;
  }
};

export const fetchUserById = async () => {
  try {
    const res = await axios.get("/auth/getUser");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const changePassword = async (currentPassword, newPassword) => {
  try {
    const response = await axios.patch("/company/change-password", {
      currentPassword,
      newPassword,
    });

    return response.data;
  } catch (error) {
    console.error(
      "Change Password Error:",
      error.response?.data?.message || error.message,
    );
    throw new Error(
      error.response?.data?.message || "Failed to change password",
    );
  }
};

export const deleteAccount = async () => {
  try {
    const response = await axiosInstance.delete("/company/account");
    return response.data;
  } catch (error) {
    console.error(
      "Delete Account Error:",
      error.response?.data?.message || error.message,
    );
    throw new Error(
      error.response?.data?.message || "Failed to delete account",
    );
  }
};

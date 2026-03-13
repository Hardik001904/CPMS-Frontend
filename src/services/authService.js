// import axios from "axios";

import { data } from "react-router-dom";
import axios from "./axios";

export const login = async (data) => {
  try {
    const res = await axios.post("/auth/login", data);
    sessionStorage.setItem("token", res.data.token);
    sessionStorage.setItem("user", JSON.stringify(res.data.user));
    return res;
  } catch (error) {
    console.log(" Login Failed", error);
    throw error;
  }
};

export const register = async (data) => {
  try {
    // console.log("inside api ", data);
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

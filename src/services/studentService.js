// import axios from "./axios";

import axios from "./axios";

export const fetchUser = async () => {
  try {
    const res = await axios.get(`/auth/get`);
    return res.data;
  } catch (error) {
    console.log(" User data Failed", error);
    throw error;
  }
};

export const updateStudentProfile = async (data) => {
  try {
    const res = await axios.put("/student/profile", data);
    return res;
  } catch (error) {
    throw error;
  }
};

export const fetchStudentById = async () => {
  try {
    const res = await axios.get(`/auth/getUser`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getStudentOverview = async () => {
  try {
    const res = await axios.get(`/student/overview`);
    return res.data.data;
  } catch (error) {
    throw error;
  }
}

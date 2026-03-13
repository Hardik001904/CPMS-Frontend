import { data } from "react-router-dom";
import axios from "./axios";

export const applyToJob = async (jobId) => {
  try {
    const res = await axios.post("/applications/apply", { jobId });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getStudentApplication = async () => {
  try {
    const res = await axios.get("/applications/student");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCompanyApplication = async () => {
  try {
    const res = await axios.get("/applications/company");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateApplicationStatus = async (id,status) => {
  try {
    console.log("status",status)
    // const s = JSON.parse({"status":status})
    // console.log(s)
    const res = await axios.patch(`/applications/${id}/status`,status);
    return res.data;
  } catch (error) {
    throw error;
  }
};

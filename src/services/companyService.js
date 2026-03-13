// export const login = async (data) => {

import axios from "./axios";

//     try {
//         const res = await axios.post("http://localhost:3000/",data);
//         return res;

//     } catch (error) {
//         console.log(" Login Failed", error)
//         throw error;
//     }

// };

export const postJobs = async (data) => {
  try {
    const res = await axios.post("/jobs/create", data);
    return res;
  } catch (error) {
    throw error;
  }
};

export const fetchAllJobs = async () => {
  try {
    const res = await axios.get("/jobs");
    return res;
  } catch (error) {
    throw error;
  }
};

export const fetchMyJobs = async () => {
  try {
    const res = await axios.get("/jobs/company");
    return res;
  } catch (error) {
    throw error;
  }
};

export const updateMyprofile = async (data) => {
  try {
    const res = await axios.put("/company/update-profile", data);
    return res;
  } catch (error) {
    throw error;
  }
};

export const fetchCompanyById = async (companyId) => {
  try {
    // console.log("fetchCompanyById", companyId);
    const res = await axios.get(`/company/companies/${companyId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getCompanyOverview = async () => {
  try {
    const res = await axios.get(`/company/overview`);
    return res.data.data;
  } catch (error) {
    throw error;
  }
};

export const getCompanyApplication = async () => {
  try {
    const res = await axios.get(`/applications/company`);
    // console.log("res", res);
    // return res.data.data;
    return res.data.application;
  } catch (error) {
    throw error;
  }
};

export const updateJobRequirements = async (jobId) => {
  try {
    const res = await axios.patch(`/jobs/${jobId}/status`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

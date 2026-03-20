import axios from "./axios";

//For job posting
export const postJobs = async (data) => {
  try {
    const res = await axios.post("/jobs/create", data);
    return res;
  } catch (error) {
    throw error;
  }
};

//Get All Posted Jobs
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

//Company Proflie Update
export const updateMyprofile = async (data) => {
  try {
    const res = await axios.put("/company/update-profile", data);
    return res;
  } catch (error) {
    throw error;
  }
};

//Get Companies By There Id
export const fetchCompanyById = async (companyId) => {
  try {
    const res = await axios.get(`/company/companies/${companyId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

//Show the Overview Of The Company Dashboard
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
    return res.data.application;
  } catch (error) {
    throw error;
  }
};

//Companies Can Upadte The Jobs According To There Requirements
export const updateJobRequirements = async (jobId) => {
  try {
    const res = await axios.patch(`/jobs/${jobId}/status`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

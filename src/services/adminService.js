import axios from "./axios";

// Get pending approvals
export const getPendingApprovals = async () => {
  try {
    const res = await axios.get("/admin/approvals");
    return res.data;
  } catch (error) {
    throw error;
  }
};

// Approve user
export const approveUser = async (id) => {
  try {
    const res = await axios.patch(`/admin/approve/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// Reject user
export const rejectUser = async (id) => {
  try {
    const res = await axios.patch(`/admin/reject/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getBinUsers = async () => {
  try {
    const res = await axios.get("/admin/bin");
    return res.data;
  } catch (error) {
    throw error;
  }
};

// Restore user
export const restoreUser = async (id) => {
  try {
    const res = await axios.patch(`/admin/restore/${id}`);
    console.log("res", res);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// Delete permanently
export const deleteUserPermanently = async (id) => {
  try {
    const res = await axios.delete(`/admin/delete/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchStudents = async () => {
  try {
    const res = await axios.get("/admin/students");
    return res.data;
  } catch (error) {
    console.log("Fetch students failed", error);
    throw error;
  }
};

export const fetchStudentProfile = async (id) => {
  try {
    const res = await axios.get(`/admin/students/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};


export const fetchCompanies = async ( search = "") => {
  try {
    const res = await axios.get("/admin/companies", {
      params: {
        search,
      },
    });

    return res.data;
  } catch (error) {
    console.log("Fetch companies failed", error);
    throw error;
  }
};

//Reports stats
export const fetchSystemStats = async () => {
  try {
    const res = await axios.get("/admin/stats");
    return res.data;
  } catch (error) {
    throw error;
  }
}

//Admin dashboard overview
export const getAdminDashboard = async () => {
try {
  const res = await axios.get("/admin/overview");
  return res.data;
} catch (error) {
  throw error;
}
}


// GET Masterstudents
export const getMasterStudents = async () => {
  try {
    const res = await axios.get("/admin/master");
    return res.data;
  } catch (error) {
    console.error(" getMasterStudents:", error);
    throw error;
  }
};

// ADD Masterstudents
export const addMasterStudent = async (student) => {
  try {
    const res = await axios.post("/admin/master", student);
    return res.data;
  } catch (error) {
    console.error(" addMasterStudent:", error);
    throw error;
  }
};

// DELETE Masterstudetns
export const deleteMasterStudent = async (id) => {
  try {
    const res = await axios.delete(`/admin/master/${id}`);
    return res.data;
  } catch (error) {
    console.error(" deleteMasterStudent:", error);
    throw error;
  }
};
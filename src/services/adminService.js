import axios from "./axios";

// Get pending approvals
export const getPendingApprovals = async () => {
  try {
    const res = await axios.get(`/admin/approvals`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// Approve user
export const approveUser = async (id,data) => {
  try {
    const res = await axios.patch(`/admin/approve/${id}`,data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

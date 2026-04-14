import axios from "./axios";

export const fetchSummaryStats = async () => {
  try {
    const res = await axios.get("/stats/summary");
    return res.data;
  } catch (error) {
    throw error;
  }
};

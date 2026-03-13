import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

//Add a request interceptor
//REQUEST INTERCEPTOR (only attach token)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token"); //Get token from storage

    //If token exists, add it to the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// RESPONSE INTERCEPTOR (handle 401 here)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("Token expired — redirecting...");

      sessionStorage.removeItem("token");

      window.location.href = "/session-expired";
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;

// src/api/utils/axiosInstance.js
import axios from "axios";

// Use localhost in development, production URL in production
const baseURL = import.meta.env.DEV 
  ? "http://localhost:5000/api"
  : "https://pet-world-backend.onrender.com/api";

const axiosInstance = axios.create({
  baseURL,
  withCredentials: false,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosInstance;

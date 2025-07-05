import { envApp } from "./env";
import axios from "axios";
// import https from "https";

// const httpsAgent = new https.Agent({
// rejectUnauthorized: false,
// });

export const axiosInstance = axios.create({
  baseURL: envApp.BACK_URL,
  withCredentials: true,
  // httpsAgent,
});

axiosInstance.interceptors.request.use((config) => {
  config.headers["Content-Type"] =
    config.data instanceof FormData
      ? "multipart/form-data"
      : "application/json";
  return config;
});

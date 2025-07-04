import { envApp } from "./env";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: envApp.BACK_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  config.headers["Content-Type"] =
    config.data instanceof FormData
      ? "multipart/form-data"
      : "application/json";
  return config;
});

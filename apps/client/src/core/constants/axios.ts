import { envApp } from "./env";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: envApp.BACK_URL,
  withCredentials: true,
});

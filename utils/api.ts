import axios from "axios";
import { getToken } from "./auth";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

api.interceptors.request.use(async (config: any) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `bearer ${token}`;
  }

  return config;
});

export default api;

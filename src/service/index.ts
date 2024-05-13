import { getCookie, removeCookie, setCookie } from "@/lib/utils/cookies";
import axios, { AxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default api;
import axios from "axios";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const VITE_TOKEN = import.meta.env.VITE_TOKEN;

export const axiosInstance = axios.create({
  baseURL: `${VITE_BACKEND_URL}`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${VITE_TOKEN}`,
  },
});

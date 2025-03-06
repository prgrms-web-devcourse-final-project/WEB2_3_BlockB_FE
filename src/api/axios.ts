// api/axios.ts
// 여기는 axios 인스턴스를 생성하고, 요청 인터셉터를 추가하는 파일입니다.
// api는 따로 파일을 만들어서 사용 중
import axios from "axios";
import { useAuthStore } from "../stores/authStore";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const axiosInstance = axios.create({
  baseURL: VITE_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const logout = useAuthStore.getState().logout;
      logout();
    }
    return Promise.reject(error);
  }
);

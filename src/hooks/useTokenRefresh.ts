import { useEffect } from "react";
import { axiosInstance } from "../api/axios";
import { useAuthStore } from "../stores/authStore";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const useTokenRefresh = () => {
  useEffect(() => {
    const interval = setInterval(async () => {
      const { refreshToken, setTokens, logout } = useAuthStore.getState();
      if (!refreshToken) return;
      try {
        const response = await axiosInstance.post(
          `${VITE_BACKEND_URL}/api/auth/reissue`,
          { refreshToken },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 201) {
          const { accessToken, refreshToken: newRefreshToken } =
            response.data.data;
          setTokens(accessToken, newRefreshToken);
        }
      } catch (error) {
        console.error(error);
        logout();
      }
    }, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);
};

export default useTokenRefresh;

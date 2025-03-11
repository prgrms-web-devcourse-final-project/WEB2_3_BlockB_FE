import { useEffect } from "react";
import { axiosInstance } from "../api/axios";
import { useAuthStore } from "../stores/authStore";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const useTokenRefresh = () => {
  useEffect(() => {
    const interval = setInterval(async () => {
      const { refreshToken, setTokens, logout, fetchUserInfo } =
        useAuthStore.getState();

      if (!refreshToken) {
        logout();
        return;
      }

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
          await fetchUserInfo(accessToken);
        }
      } catch (error) {
        console.error(error);
        logout();
      }
    }, 30 * 60 * 500); // 30분마다 실행

    return () => clearInterval(interval);
  }, []);
};

export default useTokenRefresh;

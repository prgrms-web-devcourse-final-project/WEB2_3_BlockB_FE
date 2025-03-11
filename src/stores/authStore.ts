import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "../api/axios";
import { useUserStore } from "./userStore";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isNewUser: boolean;
  setTokens: (
    accessToken: string,
    refreshToken: string,
    isNewUser?: boolean
  ) => void;
  fetchUserInfo: (accessToken: string) => Promise<void>;
  setIsNewUser: (isNewUser: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      isNewUser: false,

      setTokens: async (accessToken, refreshToken, isNewUser = false) => {
        set({ accessToken, refreshToken, isNewUser });

        await useAuthStore.getState().fetchUserInfo(accessToken);
      },
      fetchUserInfo: async (accessToken) => {
        try {
          const response = await axiosInstance.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/users/userInfo`,
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          );

          const userData = response.data.data;

          useUserStore.getState().setUser({
            userId: userData.id,
            nickname: userData.nickname,
            profileUrl: userData.profileUrl,
            role: userData.role,
          });

          if (
            userData.role === "ROLE_BANNED" ||
            userData.role === "ROLE_SUSPENDED"
          ) {
            useAuthStore.getState().logout();
          }
        } catch (error) {
          console.error("유저 정보 가져오기 실패:", error);
          useAuthStore.getState().logout();
        }
      },

      setIsNewUser: (isNewUser) => {
        set({ isNewUser });
      },

      logout: () => {
        useUserStore.getState().clearUser();
        set({ accessToken: null, refreshToken: null, isNewUser: false });
      },
    }),
    { name: "auth-store" }
  )
);

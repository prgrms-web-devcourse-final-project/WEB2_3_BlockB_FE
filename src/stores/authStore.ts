import { create } from "zustand";
import { persist } from "zustand/middleware";
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
  logout: () => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      isNewUser: false,
      setTokens: (accessToken, refreshToken, isNewUser = false) => {
        set({ accessToken, refreshToken, isNewUser });
      },
      logout: () => {
        useUserStore.getState().clearUser();
        set({ accessToken: null, refreshToken: null, isNewUser: false });
        window.location.href = "/";
      },
    }),
    { name: "auth-store" }
  )
);

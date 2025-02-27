import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  userId: number | null;
  nickname: string;
  profileUrl: string;
  role: string;
  setUser: (user: {
    userId: number;
    nickname: string;
    profileUrl: string;
    role: string;
  }) => void;
  clearUser: () => void;
}

export const useUserStore = create(
  persist<UserState>(
    (set) => ({
      userId: null,
      nickname: "",
      profileUrl: "",
      role: "",
      setUser: (user) =>
        set({
          userId: user.userId,
          nickname: user.nickname,
          profileUrl: user.profileUrl,
          role: user.role,
        }),
      clearUser: () =>
        set({ userId: null, nickname: "", profileUrl: "", role: "" }),
    }),
    { name: "user-store" }
  )
);

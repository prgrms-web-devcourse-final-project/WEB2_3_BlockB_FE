import { create } from "zustand";

interface UserState {
  userId: number | null;
  nickname: string;
  profileUrl: string;
  setUser: (user: { userId: number; nickname: string; profileUrl: string }) => void;
  clearUser: () => void;
}
// TODO: 로그인 시 store에 저장하도록 구현
export const useUserStore = create<UserState>((set) => ({
  userId: 2, // null
  nickname: "김예빈 어드민 계정d", // ""
  profileUrl: "http://k.kakaocdn.net/dn/bepNgQ/btsLDfQKtMy/SW1nexwZej6s09B2ICex2K/img_110x110.jpg", //""
  setUser: (user) => set(user),
  clearUser: () => set({ userId: null, nickname: "", profileUrl: "" }),
}));

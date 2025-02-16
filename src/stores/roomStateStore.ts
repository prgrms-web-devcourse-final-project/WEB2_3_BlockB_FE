import { create } from "zustand";

type RoomState = "generating" | "waiting" | "ongoing" | "voting" | "result";

interface RoomStateStore {
  roomState: RoomState;
  setRoomState: (state: RoomState) => void;
}

export const useRoomStore = create<RoomStateStore>((set) => ({
  roomState: "generating",
  setRoomState: (state) => set({ roomState: state }),
}));

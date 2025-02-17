import { create } from "zustand";

type RoomState = "generating" | "waiting" | "ongoing" | "voting" | "result";

interface RoomStateStore {
  roomState: RoomState;
  setRoomState: (state: RoomState) => void;
  roomSettings: RoomSettings;
  setRoomSettings: (
    key: keyof RoomSettings,
    value: string | boolean | number
  ) => void;
}

export const useRoomStore = create<RoomStateStore>((set) => ({
  roomState: "generating",
  setRoomState: (state) => set({ roomState: state }),
  roomSettings: {
    continent: null,
    category: null,
    participant: null,
    stance: null,
    hasVote: null,
    time: null,
    turn: null,
  },
  setRoomSettings: (key: string, value: string | number | boolean) =>
    set((state) => ({
      roomSettings: { ...state.roomSettings, [key]: value },
    })),
}));

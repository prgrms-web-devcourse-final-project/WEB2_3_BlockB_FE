import { create } from "zustand";

type RoomState =
  | "waiting"
  | "ongoing"
  | "won-by-default"
  | "voting"
  | "replay"
  | "result";

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
  roomState: "waiting",
  setRoomState: (state) => set({ roomState: state }),
  roomSettings: {
    title: null,
    description: null,
    continent: null,
    category: null,
    memberNumber: null,
    stance: null,
    hasVote: null,
    time: null,
    speakCount: null,
    link: null
  },
  setRoomSettings: (key: string, value: string | number | boolean) =>
    set((state) => ({
      roomSettings: { ...state.roomSettings, [key]: value },
    })),
}));

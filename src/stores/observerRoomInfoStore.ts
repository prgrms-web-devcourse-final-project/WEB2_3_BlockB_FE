import { create } from "zustand";

interface ObserverRoomState {
  observerRoomInfoDetails: DebateRoomInfo;
  setObserverRoomInfoDetails: (roomInfoData: DebateRoomInfo) => void;
}

export const useObserverRoomStore = create<ObserverRoomState>((set) => ({
  observerRoomInfoDetails: {
    roomId: "",
    title: "",
    description: "",
    memberNumberType: 1,
    categoryType: "",
    continentType: "",
    newsUrl: "",
    status: "",
    timeType: 30,
    speakCountType: 3,
    resultEnabled: false,
    proUsers: [],
    conUsers: [],
  },
  setObserverRoomInfoDetails: (roomInfoData) =>
    set((state) => ({
      observerRoomInfoDetails: { ...state.observerRoomInfoDetails, ...roomInfoData },
    })),
}));

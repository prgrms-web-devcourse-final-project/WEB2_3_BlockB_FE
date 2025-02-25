import { create } from "zustand";

type ObservingState =
  | "waiting"
  | "ongoing"
  | "won-by-default"
  | "voting"
  | "replay"
  | "result";

interface ObservingStateStore {
  observingState: ObservingState;
  setObservingState: (state: ObservingState) => void;
}

export const useObservingStore = create<ObservingStateStore>((set) => ({
  observingState: "voting",
  setObservingState: (state) => set({ observingState: state }),
}));

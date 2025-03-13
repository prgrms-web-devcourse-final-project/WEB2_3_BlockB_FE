import { create } from "zustand";

type ObservingState =
  | "waiting"
  | "ongoing"
  | "won-by-default"
  | "voting"
  | "replay"
  | "result"
  | "exit_overflow_null"

interface ObservingStateStore {
  observingState: ObservingState;
  setObservingState: (state: ObservingState) => void;
}

export const useObservingStore = create<ObservingStateStore>((set) => ({
  observingState: "waiting",
  setObservingState: (state) => set({ observingState: state }),
}));

import { create } from "zustand";

export enum InputMode {
  SECONDS = "seconds",
  MINUTES = "minutes",
  HOURS = "hours",
}

interface TimerStore {
  time: number;
  isRunning: boolean;
  inputMode: InputMode;
  inputValue: string;
  setTime: (time: number | ((prevTime: number) => number)) => void;
  setIsRunning: (isRunning: boolean) => void;
  setInputMode: (mode: InputMode) => void;
  setInputValue: (value: string) => void;
  reset: () => void;
}

export const useTimerStore = create<TimerStore>((set) => ({
  time: 0,
  isRunning: false,
  inputMode: InputMode.SECONDS,
  inputValue: "",
  setTime: (time) =>
    set((state) => ({
      time: typeof time === "function" ? time(state.time) : time,
    })),
  setIsRunning: (isRunning) => set({ isRunning }),
  setInputMode: (inputMode) => set({ inputMode }),
  setInputValue: (inputValue) => set({ inputValue }),
  reset: () =>
    set({
      time: 0,
      isRunning: false,
      inputMode: InputMode.SECONDS,
      inputValue: "",
    }),
}));

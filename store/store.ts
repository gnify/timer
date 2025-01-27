import { create } from "zustand";

interface TimerStore {
  time: number;
  isRunning: boolean;

  rawInput: string;
  isEditing: boolean;

  inputValue: {
    hours: number;
    minutes: number;
    seconds: number;
  };

  setTime: (time: number | ((prevTime: number) => number)) => void;
  setIsRunning: (isRunning: boolean) => void;
  setRawInput: (value: string) => void;
  toggleEditing: (value: boolean) => void;
  setInputValue: (values: {
    hours?: number;
    minutes?: number;
    seconds?: number;
  }) => void;
  reset: () => void;

  setTimeDirect: (unit: "hours" | "minutes" | "seconds", value: number) => void;

  get hours(): number;
  get minutes(): number;
  get seconds(): number;
}

export const useTimerStore = create<TimerStore>((set, get) => ({
  time: 0,
  isRunning: false,
  rawInput: "",
  isEditing: false,
  inputValue: { hours: 0, minutes: 0, seconds: 0 },

  setTime: (time) => {
    const newTime = typeof time === "function" ? time(get().time) : time;
    const hours = Math.floor(newTime / 3600);
    const minutes = Math.floor((newTime % 3600) / 60);
    const seconds = newTime % 60;

    set({
      time: newTime,
      inputValue: {
        hours: Math.min(999, hours),
        minutes: Math.min(59, minutes),
        seconds: Math.min(59, seconds),
      },
    });
  },

  setIsRunning: (isRunning) => set({ isRunning }),

  setRawInput: (rawInput) => set({ rawInput }),

  toggleEditing: (isEditing) => set({ isEditing }),

  setInputValue: (values) => {
    const current = get().inputValue;
    const newValues = {
      hours: Math.min(999, values.hours ?? current.hours),
      minutes: Math.min(59, values.minutes ?? current.minutes),
      seconds: Math.min(59, values.seconds ?? current.seconds),
    };

    set({
      inputValue: newValues,
      time: newValues.hours * 3600 + newValues.minutes * 60 + newValues.seconds,
    });
  },

  setTimeDirect: (unit, value) => {
    const current = get();
    let total = current.time;

    if (unit === "hours") {
      total = value * 3600 + current.minutes * 60 + current.seconds;
    } else if (unit === "minutes") {
      total = current.hours * 3600 + value * 60 + current.seconds;
    } else {
      total = current.hours * 3600 + current.minutes * 60 + value;
    }

    set({ time: total });
  },

  reset: () =>
    set({
      time: 0,
      isRunning: false,
      rawInput: "",
      isEditing: false,
      inputValue: { hours: 0, minutes: 0, seconds: 0 },
    }),

  get hours() {
    return Math.floor(get().time / 3600);
  },
  get minutes() {
    return Math.floor((get().time % 3600) / 60);
  },
  get seconds() {
    return get().time % 60;
  },
}));

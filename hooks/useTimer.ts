import { useEffect } from "react";
import { useTimerStore } from "../store/store";

export const useTimer = () => {
  const { time, isRunning, setTime, setIsRunning } = useTimerStore();

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime(time - 1);
      }, 1000);
    } else if (time === 0 && isRunning) {
      setIsRunning(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, time, setTime, setIsRunning]);
};

import React, { useCallback } from "react";
import { useTimerStore } from "../store/store";
import { Button } from "./ui/button";

export const TimerControls: React.FC = () => {
  const { time, isRunning, setIsRunning, reset } = useTimerStore();

  const startTimer = useCallback(() => {
    if (time > 0) {
      setIsRunning(true);
    }
  }, [time, setIsRunning]);

  return (
    <div className="mt-8">
      {!isRunning && time > 0 ? (
        <Button onClick={startTimer}>Start Timer</Button>
      ) : (
        <Button onClick={reset}>Reset Timer</Button>
      )}
    </div>
  );
};

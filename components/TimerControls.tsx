import React, { useCallback } from "react";
import { useTimerStore } from "../store/store";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

export const TimerControls: React.FC = () => {
  const { time, isRunning, setIsRunning, reset } = useTimerStore();

  const startTimer = useCallback(() => {
    if (time > 0) {
      setIsRunning(true);
      navigator.vibrate?.(50);
    }
  }, [time, setIsRunning]);

  return (
    <motion.div className="mt-8 flex gap-4">
      {!isRunning && time > 0 ? (
        <Button
          onClick={startTimer}
          size="lg"
          className="px-8 h-12 text-base font-medium bg-green-600 hover:bg-green-700"
        >
          Start
        </Button>
      ) : (
        <Button
          onClick={reset}
          size="lg"
          variant="destructive"
          className="px-8 h-12 text-base font-medium"
        >
          Reset
        </Button>
      )}
    </motion.div>
  );
};

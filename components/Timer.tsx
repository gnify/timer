import React, { useRef } from "react";
import { TimerDisplay } from "./TimerDisplay";
import { TimerControls } from "./TimerControls";
import { useTimer } from "../hooks/useTimer";
import { useTimerStore } from "../store/store";
import { DigitalDigit } from "./DigitalDigit";

export const Timer: React.FC = () => {
  const { isRunning } = useTimerStore();
  const audioRef = useRef<HTMLAudioElement>(null);
  useTimer();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <TimerDisplay />
      {!isRunning && <DigitalDigit />}
      <TimerControls />
      <audio ref={audioRef} src="./beep.mp3"></audio>
    </div>
  );
};

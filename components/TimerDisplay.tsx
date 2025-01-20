import React from "react";
import { useTimerStore } from "../store/store";
import { formatTime } from "../utils/formatTime";

export const TimerDisplay: React.FC = () => {
  const time = useTimerStore((state) => state.time);
  return <div className="text-8xl font-mono mb-8">{formatTime(time)}</div>;
};

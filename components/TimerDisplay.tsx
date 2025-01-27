import React, { useState, useRef } from "react";
import { useTimerStore } from "../store/store";
import { DigitalDigit } from "./DigitalDigit";
import { motion } from "framer-motion";

interface EditState {
  unit: "hours" | "minutes" | "seconds";
  position: 0 | 1;
}

export const TimerDisplay: React.FC = () => {
  const { time, setTime, isRunning } = useTimerStore();
  const [editState, setEditState] = useState<EditState | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const hours = Math.floor(time / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((time % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (time % 60).toString().padStart(2, "0");

  const handleDigitClick = (
    unit: "hours" | "minutes" | "seconds",
    position: 0 | 1
  ) => {
    if (!isRunning) {
      setEditState({ unit, position });
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 2);
    if (!editState) return;

    const current = {
      hours: parseInt(hours),
      minutes: parseInt(minutes),
      seconds: parseInt(seconds),
    };

    const newValue =
      editState.position === 0
        ? parseInt(value.padEnd(2, current[editState.unit].toString()[1]))
        : parseInt(current[editState.unit].toString()[0] + value);

    let clampedValue = newValue;
    if (editState.unit === "hours") clampedValue = Math.min(23, newValue);
    else clampedValue = Math.min(59, newValue);

    const totalSeconds =
      (editState.unit === "hours" ? clampedValue : parseInt(hours)) * 3600 +
      (editState.unit === "minutes" ? clampedValue : parseInt(minutes)) * 60 +
      (editState.unit === "seconds" ? clampedValue : parseInt(seconds));

    setTime(totalSeconds);
  };

  return (
    <motion.div
      className="flex items-center gap-4 mb-8 relative"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {["hours", "minutes", "seconds"].map((unit, idx) => (
        <React.Fragment key={unit}>
          <div className="flex gap-1">
            {[0, 1].map((position) => {
              const value =
                unit === "hours"
                  ? hours
                  : unit === "minutes"
                  ? minutes
                  : seconds;
              const digit = parseInt(value[position as 0 | 1]);

              return (
                <DigitalDigit
                  key={`${unit}-${position}`}
                  value={digit}
                  isActive={
                    editState?.unit === unit && editState?.position === position
                  }
                  onClick={() =>
                    handleDigitClick(
                      unit as "hours" | "minutes" | "seconds",
                      position as 0 | 1
                    )
                  }
                />
              );
            })}
          </div>
          {idx < 2 && (
            <div className="text-black font-bold text-4xl self-end pb-4">:</div>
          )}
        </React.Fragment>
      ))}

      <input
        ref={inputRef}
        type="number"
        className="absolute opacity-0 w-0 h-0"
        value={
          editState
            ? ((unit) => {
                const value =
                  unit === "hours"
                    ? hours
                    : unit === "minutes"
                    ? minutes
                    : seconds;
                return value[editState.position];
              })(editState.unit)
            : ""
        }
        onChange={handleInputChange}
        onBlur={() => setEditState(null)}
        onKeyDown={(e) => e.key === "Enter" && setEditState(null)}
      />
    </motion.div>
  );
};

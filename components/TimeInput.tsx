import React, { useCallback } from "react";
import { useTimerStore } from "../store/store";
import { InputMode } from "../store/store";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export const TimeInput: React.FC = () => {
  const { inputMode, inputValue, setInputValue, setTime, setInputMode } =
    useTimerStore();

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/\D/g, "");
      setInputValue(value);
    },
    [setInputValue]
  );

  const handleInputSubmit = useCallback(() => {
    const value = parseInt(inputValue, 10);
    if (!isNaN(value)) {
      switch (inputMode) {
        case InputMode.SECONDS:
          setTime((prevTime) => prevTime + value);
          setInputMode(InputMode.MINUTES);
          break;
        case InputMode.MINUTES:
          setTime((prevTime) => prevTime + value * 60);
          setInputMode(InputMode.HOURS);
          break;
        case InputMode.HOURS:
          setTime((prevTime) => prevTime + value * 3600);
          setInputMode(InputMode.SECONDS);
          break;
        default:
          break;
      }
      setInputValue("");
    }
  }, [inputMode, inputValue, setTime, setInputMode, setInputValue]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-xl">
        Input{" "}
        {inputMode === InputMode.SECONDS
          ? "seconds"
          : inputMode === InputMode.MINUTES
          ? "minutes"
          : "hours"}
        :
      </div>
      <Input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="0"
      />
      <Button onClick={handleInputSubmit}>
        {inputMode === InputMode.HOURS ? "Finish input" : "Next"}
      </Button>
    </div>
  );
};

import React from "react";

const segmentMap: Record<number, number[]> = {
  0: [1, 1, 1, 1, 1, 1, 0],
  1: [0, 1, 1, 0, 0, 0, 0],
  2: [1, 1, 0, 1, 1, 0, 1],
  3: [1, 1, 1, 1, 0, 0, 1],
  4: [0, 1, 1, 0, 0, 1, 1],
  5: [1, 0, 1, 1, 0, 1, 1],
  6: [1, 0, 1, 1, 1, 1, 1],
  7: [1, 1, 1, 0, 0, 0, 0],
  8: [1, 1, 1, 1, 1, 1, 1],
  9: [1, 1, 1, 1, 0, 1, 1],
};

interface DigitalDigitProps {
  value: number;
  onClick?: () => void;
  isActive?: boolean;
}

export const DigitalDigit: React.FC<DigitalDigitProps> = ({
  value,
  onClick,
  isActive,
}) => {
  const segments = segmentMap[value] || [];

  return (
    <div
      className={`relative w-12 h-20 cursor-pointer ${
        isActive ? "ring-2 ring-blue-500" : ""
      }`}
      onClick={onClick}
    >
      {/* Top segment */}
      <div
        className={`absolute top-0 left-1 right-1 h-2 ${
          segments[0] ? "bg-black" : ""
        }`}
      />
      {/* Upper right */}
      <div
        className={`absolute top-1 right-0 w-2 h-8 ${
          segments[1] ? "bg-black" : ""
        }`}
      />
      {/* Lower right */}
      <div
        className={`absolute bottom-1 right-0 w-2 h-8 ${
          segments[2] ? "bg-black" : ""
        }`}
      />
      {/* Bottom segment */}
      <div
        className={`absolute bottom-0 left-1 right-1 h-2 ${
          segments[3] ? "bg-black" : ""
        }`}
      />
      {/* Lower left */}
      <div
        className={`absolute bottom-1 left-0 w-2 h-8 ${
          segments[4] ? "bg-black" : ""
        }`}
      />
      {/* Upper left */}
      <div
        className={`absolute top-1 left-0 w-2 h-8 ${
          segments[5] ? "bg-black" : ""
        }`}
      />
      {/* Middle segment */}
      <div
        className={`absolute top-1/2 left-1 right-1 h-2 -translate-y-1/2 ${
          segments[6] ? "bg-black" : ""
        }`}
      />
    </div>
  );
};

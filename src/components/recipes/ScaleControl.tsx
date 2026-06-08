"use client";

import { cn } from "@/lib/utils";

interface ScaleControlProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}

export function ScaleControl({ value, min = 1, max = 99, onChange }: ScaleControlProps) {
  const decrease = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const increase = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  return (
    <div className="inline-flex items-center rounded-md border">
      <button
        type="button"
        onClick={decrease}
        disabled={value <= min}
        className={cn(
          "px-3 py-2 text-lg font-medium border-r hover:bg-gray-50 transition-colors",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
        aria-label="Decrease servings"
      >
        −
      </button>
      <span className="px-4 py-2 min-w-[60px] text-center font-medium">{value}</span>
      <button
        type="button"
        onClick={increase}
        disabled={value >= max}
        className={cn(
          "px-3 py-2 text-lg font-medium border-l hover:bg-gray-50 transition-colors",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
        aria-label="Increase servings"
      >
        +
      </button>
    </div>
  );
}
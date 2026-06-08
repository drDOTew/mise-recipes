import React from "react";
import { cn } from "@/lib/utils";

interface StepBadgeProps {
  number: number;
  className?: string;
}

export function StepBadge({ number, className }: StepBadgeProps) {
  return (
    <span
      className={cn(
        "w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-sm font-bold flex-shrink-0",
        className
      )}
    >
      {number}
    </span>
  );
}
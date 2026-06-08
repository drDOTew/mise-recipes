import React from "react";
import { cn } from "@/lib/utils";

interface FilterPillProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export function FilterPill({
  label,
  isActive = false,
  onClick,
  className,
}: FilterPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center px-3 py-1.5 rounded-[100px] text-sm font-medium transition-colors duration-150",
        "border",
        isActive
          ? "bg-accent-bg border-accent text-accent"
          : "bg-transparent border-border-light text-text-secondary hover:border-gray-400",
        className
      )}
    >
      {label}
    </button>
  );
}
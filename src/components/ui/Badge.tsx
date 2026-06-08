import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "accent";
}

export function Badge({
  variant = "default",
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-[100px] text-sm font-medium",
        variant === "default"
          ? "bg-gray-100 text-gray-700"
          : "bg-accent-bg text-accent",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
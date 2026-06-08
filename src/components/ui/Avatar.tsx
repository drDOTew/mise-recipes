import React from "react";
import { cn } from "@/lib/utils";
import { getInitials } from "@/lib/utils";

interface AvatarProps {
  src?: string;
  name?: string;
  size?: "sm" | "md" | "lg";
  variant?: "circle" | "initials";
  className?: string;
}

const sizeClasses = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-14 h-14 text-base",
};

export function Avatar({
  src,
  name = "",
  size = "md",
  variant = "circle",
  className,
}: AvatarProps) {
  const [imgError, setImgError] = React.useState(false);

  if (src && !imgError) {
    return (
      <img
        src={src}
        alt={name}
        className={cn(
          "object-cover",
          variant === "circle" ? "rounded-full" : "rounded-lg",
          sizeClasses[size],
          className
        )}
        onError={() => setImgError(true)}
      />
    );
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center bg-accent-bg text-accent font-medium",
        variant === "circle" ? "rounded-full" : "rounded-lg",
        sizeClasses[size],
        className
      )}
    >
      {getInitials(name)}
    </div>
  );
}
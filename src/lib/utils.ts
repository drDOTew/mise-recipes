import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Scale ingredient quantity based on serving multiplier
 */
export function scaleQuantity(
  quantity: string | number,
  originalServings: number,
  newServings: number
): string {
  const original = parseFloat(quantity as string);
  if (isNaN(original)) return quantity as string;
  
  const multiplier = newServings / originalServings;
  const scaled = original * multiplier;
  
  // Format: remove trailing zeros
  return scaled.toFixed(3).replace(/\.?0+$/, "");
}

/**
 * Format time in minutes to human readable
 */
export function formatTime(minutes: number | null): string {
  if (!minutes) return "";
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
}

/**
 * Generate initials from name
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}
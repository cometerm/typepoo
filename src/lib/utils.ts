import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names using clsx and tailwind-merge.
 * Usage: cn('px-4', conditionalClass && 'text-red-500')
 */
export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(centsOrDollars: number): string {
  if (centsOrDollars % 1 === 0) {
    return `$${centsOrDollars}`;
  }
  return `$${centsOrDollars.toFixed(2)}`;
}

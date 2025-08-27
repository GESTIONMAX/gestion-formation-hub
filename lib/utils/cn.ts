import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combine et optimise les classes Tailwind avec clsx et twMerge
 * Permet de fusionner plusieurs conditions pour les classes CSS
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

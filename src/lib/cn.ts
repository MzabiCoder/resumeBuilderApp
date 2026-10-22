import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * Teach tailwind-merge our custom font sizes; otherwise `text-display-xl` is
 * mistaken for a colour and `cn("text-display-xl", "text-ink")` drops one.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: { text: ["display-xl", "display-lg", "display-md", "display-sm", "lead"] },
  },
});

/** Merge conditional class names and resolve Tailwind conflicts (last wins). */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

"use client";

import { useShowpiece, type ShowpieceModule } from "@/hooks/useShowpiece";

export interface HeroMotionProps {
  /** ID of the server-rendered hero section. */
  targetId?: string;
}

const load = (): Promise<ShowpieceModule> => import("./hero-motion");

/** Behaviour only — renders nothing. See SHOWPIECES.md. */
export function HeroMotion({ targetId = "hero" }: HeroMotionProps) {
  useShowpiece(targetId, load, { rootMargin: "0px", defer: "idle" });
  return null;
}

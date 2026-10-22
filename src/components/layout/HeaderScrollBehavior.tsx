"use client";

import { useEffect } from "react";

export interface HeaderScrollBehaviorProps {
  targetId: string;
  /** Pixels scrolled before the header solidifies. */
  threshold?: number;
}

/**
 * Behaviour-only: renders nothing, toggles `data-scrolled` on the target so CSS can
 * solidify the header. Without JS the header simply stays in its solid default state.
 */
export function HeaderScrollBehavior({ targetId, threshold = 8 }: HeaderScrollBehaviorProps) {
  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      el.dataset.scrolled = String(window.scrollY > threshold);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [targetId, threshold]);
  return null;
}

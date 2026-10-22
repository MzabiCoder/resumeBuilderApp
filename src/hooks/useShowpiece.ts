"use client";

import { useEffect } from "react";
import { reportError } from "@/lib/report-error";

export type Cleanup = () => void;
export interface ShowpieceModule {
  init: (root: HTMLElement) => Cleanup | Promise<Cleanup>;
}

export interface UseShowpieceOptions {
  /** How far before the viewport to start loading (IntersectionObserver rootMargin). */
  rootMargin?: string;
}

/**
 * Lazily attaches a motion module to the server-rendered section `#targetId`:
 *  - skipped entirely under prefers-reduced-motion (static, complete content remains)
 *  - the module chunk is only fetched when the section nears the viewport
 *  - any load/init failure is reported and swallowed: content is never affected
 *  - cleanup (timelines, ScrollTriggers, listeners) runs on unmount
 */
export function useShowpiece(
  targetId: string,
  load: () => Promise<ShowpieceModule>,
  { rootMargin = "200px" }: UseShowpieceOptions = {},
): void {
  useEffect(() => {
    const root = document.getElementById(targetId);
    if (!root || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let cleanup: Cleanup | undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        observer.disconnect();
        load()
          .then((mod) => mod.init(root))
          .then((fn) => {
            if (disposed) fn();
            else cleanup = fn;
          })
          .catch((error: unknown) => {
            root.dataset.motion = "failed";
            reportError(error);
          });
      },
      { rootMargin },
    );
    observer.observe(root);

    return () => {
      disposed = true;
      observer.disconnect();
      try {
        cleanup?.();
      } catch (error) {
        reportError(error);
      }
    };
  }, [targetId, load, rootMargin]);
}

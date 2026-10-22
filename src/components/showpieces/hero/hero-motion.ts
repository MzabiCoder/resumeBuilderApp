import { gsap } from "gsap";
import { createHeroTimeline } from "./hero-timeline";

/** Dynamically imported chunk (GSAP core only). Plays once when the hero is visible. */
export function init(root: HTMLElement) {
  const { cleanup } = createHeroTimeline(root, gsap);
  return cleanup;
}

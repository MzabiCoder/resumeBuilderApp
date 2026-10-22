import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createAiDemoTimeline } from "./ai-demo-timeline";

gsap.registerPlugin(ScrollTrigger);

/** Dynamically imported chunk (GSAP + ScrollTrigger). Scrubbed — no pinning, so no layout shift. */
export function init(root: HTMLElement) {
  const stage = root.querySelector<HTMLElement>('[data-anim="ai-stage"]') ?? root;
  const { cleanup } = createAiDemoTimeline(root, gsap, {
    scrollTrigger: { trigger: stage, start: "top 75%", end: "bottom 45%", scrub: 0.6 },
  });
  return cleanup;
}

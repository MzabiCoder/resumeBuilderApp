import type { gsap as GsapType } from "gsap";
import { splitWords } from "../split-words";

type Gsap = typeof GsapType;

/**
 * "Weak bullet → strong bullet", scrubbed by scroll. Targets only data hooks:
 *  [data-anim="ai-before"]  words dim and get struck through
 *  [data-anim="ai-after"]   words light up one by one (placeholders in <mark> included)
 *  [data-anim="ai-score"][data-from][data-to]  number counts up
 *  [data-anim="ai-meter"][data-from][data-to]  bar fill (scaleX) grows
 * Timeline progress 1 === the server-rendered final state.
 */
export function createAiDemoTimeline(root: HTMLElement, gsap: Gsap, vars: gsap.TimelineVars = {}) {
  const one = (sel: string) => root.querySelector<HTMLElement>(sel);
  const before = one('[data-anim="ai-before"]');
  const after = one('[data-anim="ai-after"]');
  const score = one('[data-anim="ai-score"]');
  const meter = one('[data-anim="ai-meter"]');

  const beforeSplit = before ? splitWords(before) : null;
  const afterSplit = after ? splitWords(after) : null;
  const num = (el: HTMLElement | null, key: "from" | "to") => Number(el?.dataset[key] ?? 0);

  const tl = gsap.timeline({ defaults: { ease: "none" }, ...vars });

  if (before && beforeSplit) {
    tl.fromTo(
      before,
      { textDecorationColor: "rgba(190,35,41,0)" },
      { textDecorationColor: "rgba(190,35,41,0.9)", duration: 0.35 },
      0,
    );
    tl.fromTo(
      beforeSplit.words,
      { opacity: 1 },
      { opacity: 0.45, duration: 0.3, stagger: 0.01 },
      0.05,
    );
  }
  if (afterSplit) {
    // Opacity only on word spans: transform tweens make GSAP measure (and, for
    // un-laid-out elements, temporarily re-parent) nodes, which can reorder text.
    tl.fromTo(
      afterSplit.words,
      { opacity: 0.12 },
      { opacity: 1, duration: 0.15, stagger: 0.035 },
      0.3,
    );
  }
  if (score) {
    const state = { v: num(score, "from") };
    tl.to(
      state,
      {
        v: num(score, "to"),
        duration: 0.6,
        onUpdate: () => void (score.textContent = String(Math.round(state.v))),
      },
      0.3,
    );
  }
  if (meter) {
    tl.fromTo(
      meter,
      { scaleX: num(meter, "from") / 100 },
      { scaleX: num(meter, "to") / 100, duration: 0.6 },
      0.3,
    );
  }

  const cleanup = () => {
    tl.scrollTrigger?.kill();
    tl.kill();
    beforeSplit?.revert();
    afterSplit?.revert();
    if (score) score.textContent = String(num(score, "to"));
    gsap.set([before, meter].filter(Boolean), { clearProps: "all" });
  };

  return {
    timeline: tl,
    targets: {
      before: Boolean(before),
      after: Boolean(after),
      score: Boolean(score),
      meter: Boolean(meter),
      words: (beforeSplit?.words.length ?? 0) + (afterSplit?.words.length ?? 0),
    },
    cleanup,
  };
}

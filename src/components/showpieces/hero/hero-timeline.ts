import type { gsap as GsapType } from "gsap";

type Gsap = typeof GsapType;

/**
 * "Resume assembling itself". Targets only data hooks inside `root`:
 *  [data-anim="resume-section"]  sections slide/fade into place
 *  [data-anim="type"]            existing text is re-typed (whatever the copy is)
 *  [data-anim="score"][data-value] number ticks 0 → data-value
 *  [data-anim="badge"]           chips pop in
 * Ends in exactly the server-rendered state; cleanup restores it if interrupted.
 */
export function createHeroTimeline(root: HTMLElement, gsap: Gsap) {
  const q = <T extends HTMLElement>(sel: string) => Array.from(root.querySelectorAll<T>(sel));
  const sections = q('[data-anim="resume-section"]');
  const typers = q('[data-anim="type"]');
  const scores = q('[data-anim="score"]');
  const badges = q('[data-anim="badge"]');
  const originals = new Map(typers.map((el) => [el, el.textContent ?? ""]));
  const finalScores = new Map(
    scores.map((el) => [el, Number(el.dataset.value ?? el.textContent ?? 0)]),
  );

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  if (sections.length) {
    tl.to(sections, { autoAlpha: 0, y: 14, duration: 0.18, stagger: 0.02 });
    tl.to(sections, { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.16 });
  }
  typers.forEach((el, i) => {
    const text = originals.get(el) ?? "";
    const state = { n: 0 };
    tl.to(
      state,
      {
        n: text.length,
        duration: Math.min(1.1, 0.25 + text.length * 0.012),
        ease: "none",
        onStart: () => {
          el.textContent = "";
        },
        onUpdate: () => {
          el.textContent = text.slice(0, Math.round(state.n));
        },
      },
      0.2 + i * 0.18,
    );
  });
  scores.forEach((el) => {
    const target = finalScores.get(el) ?? 0;
    const state = { v: 0 };
    tl.to(
      state,
      {
        v: target,
        duration: 1.4,
        ease: "power2.out",
        onUpdate: () => void (el.textContent = String(Math.round(state.v))),
      },
      0.5,
    );
  });
  if (badges.length)
    tl.from(
      badges,
      { autoAlpha: 0, scale: 0.85, y: 8, duration: 0.45, stagger: 0.12, ease: "back.out(2)" },
      0.9,
    );

  const cleanup = () => {
    tl.kill();
    originals.forEach((text, el) => (el.textContent = text));
    finalScores.forEach((v, el) => (el.textContent = String(v)));
    gsap.set([...sections, ...badges], { clearProps: "all" });
  };

  return {
    timeline: tl,
    targets: {
      sections: sections.length,
      typers: typers.length,
      scores: scores.length,
      badges: badges.length,
    },
    cleanup,
  };
}

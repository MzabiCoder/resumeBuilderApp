import { render } from "@testing-library/react";
import { gsap } from "gsap";
import { describe, expect, it } from "vitest";
import { Hero } from "@/components/marketing/Hero";
import { AiWriterDemo } from "@/components/marketing/AiWriterDemo";
import { aiDemo, hero } from "@/content/home";
import { createHeroTimeline } from "./hero/hero-timeline";
import { createAiDemoTimeline } from "./ai-demo/ai-demo-timeline";
import { splitWords } from "./split-words";

/** Copy edits must never break the motion: run the timelines against altered content. */
const alteredHero = {
  ...hero,
  headline: "A completely different headline that is much longer than the original one",
  resume: {
    ...hero.resume,
    name: "Alex Q. Example-Longname",
    title: "Senior Principal Something",
    summary: "Short.",
    experience: [
      { role: "Role", org: "Org", dates: "2020", bullets: ["One", "Two", "Three", "Four"] },
    ],
    strength: { label: "Score", value: 57 },
    badges: ["Only one badge"],
  },
};
const alteredDemo = {
  ...aiDemo,
  before: "Did stuff.",
  after: "Shipped [N] features with <b>no</b> fuss [X%].",
  scoreFrom: 5,
  scoreTo: 77,
};

describe.each([
  ["original copy", hero],
  ["altered copy", alteredHero],
])("Hero motion with %s", (_label, content) => {
  it("attaches to hooks, ends in the server-rendered state and cleans up", () => {
    const { container } = render(<Hero content={content} />);
    const root = container.querySelector<HTMLElement>("#hero")!;
    const before = root.innerHTML;
    const { timeline, targets, cleanup } = createHeroTimeline(root, gsap);
    expect(targets.sections).toBeGreaterThan(0);
    expect(targets.typers).toBeGreaterThan(0);
    expect(targets.scores).toBe(1);
    expect(targets.badges).toBeGreaterThan(0);
    timeline.progress(1);
    expect(root.querySelector('[data-anim="score"]')!.textContent).toBe(
      String(content.resume.strength.value),
    );
    expect(root.textContent).toContain(content.resume.name);
    cleanup();
    expect(root.innerHTML.replace(/ style="[^"]*"/g, "")).toBe(
      before.replace(/ style="[^"]*"/g, ""),
    );
  });
});

describe.each([
  ["original copy", aiDemo],
  ["altered copy", alteredDemo],
])("AI demo motion with %s", (_label, content) => {
  it("finds every hook, reaches the final state and restores the DOM", () => {
    const { container } = render(<AiWriterDemo content={content} />);
    const root = container.querySelector<HTMLElement>("#ai-writer")!;
    const before = root.innerHTML;
    const { timeline, targets, cleanup } = createAiDemoTimeline(root, gsap, { paused: true });
    expect(targets).toMatchObject({ before: true, after: true, score: true, meter: true });
    expect(targets.words).toBeGreaterThan(2);
    timeline.progress(1);
    expect(root.querySelector('[data-anim="ai-score"]')!.textContent).toBe(String(content.scoreTo));
    expect(root.querySelector('[data-anim="ai-after"]')!.textContent).toBe(content.after);
    cleanup();
    expect(root.innerHTML.replace(/ style="[^"]*"/g, "")).toBe(
      before.replace(/ style="[^"]*"/g, ""),
    );
  });
});

describe("splitWords", () => {
  it("preserves nested markup and reverts exactly", () => {
    const el = document.createElement("p");
    el.innerHTML = "Cut costs <mark>[X%]</mark> fast";
    const { words, revert } = splitWords(el);
    expect(words.map((w) => w.textContent)).toEqual(["Cut", "costs", "[X%]", "fast"]);
    expect(el.querySelector("mark [data-word]")).not.toBeNull();
    revert();
    expect(el.innerHTML).toBe("Cut costs <mark>[X%]</mark> fast");
  });
});

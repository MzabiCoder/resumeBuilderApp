import type { Tip } from "./schema";

/** Each tip links to a help article (MDX, Phase 7). */
export const tips: Tip[] = [
  {
    title: "Lead with results, not duties",
    body: "Start bullets with a strong verb and end with the outcome: what changed because of you?",
    href: "/help/write-strong-bullet-points",
    icon: "target",
  },
  {
    title: "Mirror the job post",
    body: "Reuse the exact skill names from the listing so both recruiters and ATS see the match.",
    href: "/help/tailor-your-resume",
    icon: "search-check",
  },
  {
    title: "Quantify one thing per role",
    body: "Team size, budget, time saved, customers served — a single number makes a bullet credible.",
    href: "/help/add-metrics-to-your-resume",
    icon: "list-checks",
  },
  {
    title: "Keep it to one page (mostly)",
    body: "Under 10 years of experience? One page. More? Two is fine if every line earns its place.",
    href: "/help/resume-length",
    icon: "file-text",
  },
  {
    title: "Write a summary last",
    body: "Once the rest is done, sum up who you are and what you want next in two or three lines.",
    href: "/help/write-a-resume-summary",
    icon: "pen-line",
  },
  {
    title: "Run the ATS check",
    body: "Standard headings, real text and common fonts keep software from scrambling your details.",
    href: "/help/ats-friendly-resume",
    icon: "shield-check",
  },
];

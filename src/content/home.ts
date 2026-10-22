import type { z } from "zod";
import type { aiDemoContent, Cta, FeatureItem, heroContent, SectionHeader } from "./schema";

export const hero = {
  eyebrow: "Free AI resume builder",
  headline: "Create a resume that gets noticed —",
  headlineAccent: "free.",
  subhead:
    "Simple, easy and fast. Let AI write it, start from an expert sample, or upload the resume you have and make it better.",
  points: ["100% free", "No watermark", "No credit card"],
  primaryCta: { label: "Create My Resume", href: "/resume/start" },
  secondaryCta: { label: "Upload My Resume", href: "/resume/upload" },
  visual: {
    alt: "",
    note: "Image slot: the hero shows a live-rendered sample resume (real text). Phase 3 can swap in exported template previews (scripts/export-template-previews).",
  },
  resume: {
    label: "Sample",
    name: "Jordan Rivera",
    title: "Operations Manager",
    contact: ["jordan.rivera@example.com", "(555) 0142", "Denver, CO"],
    summary:
      "Operations manager with 8 years of experience streamlining fulfilment for fast-growing retail teams. Known for calm leadership and measurable process wins.",
    experience: [
      {
        role: "Operations Manager",
        org: "Northwind Supply (fictional)",
        dates: "2021 – Present",
        bullets: [
          "Cut order-to-ship time 32% by redesigning pick routes across 2 warehouses",
          "Led a team of 18 through a WMS migration with zero missed shipments",
        ],
      },
      {
        role: "Logistics Coordinator",
        org: "Bluebird Retail (fictional)",
        dates: "2017 – 2021",
        bullets: ["Built a vendor scorecard that reduced late deliveries by 21%"],
      },
    ],
    skills: ["Process design", "Team leadership", "Inventory planning", "SQL"],
    strength: { label: "Resume strength", value: 92 },
    badges: ["ATS-ready", "Free PDF & Word"],
  },
} satisfies z.input<typeof heroContent>;

export const freePromise = {
  title: "Free means free.",
  items: [
    {
      title: "100% free to build",
      body: "Every template, every section and the AI writer — no trial, no tiers.",
      icon: "wand",
    },
    {
      title: "100% free to download",
      body: "PDF and Word downloads, as many times as you like.",
      icon: "download",
    },
    {
      title: "No credit card, no watermark",
      body: "Nothing to cancel. Your resume carries your name, not ours.",
      icon: "credit-card",
    },
  ],
} satisfies { title: string; items: FeatureItem[] };

export const howItWorks = {
  eyebrow: "How it works",
  title: "Three steps to a resume you’re proud to send",
  intro: "Most people finish in 10–15 minutes.",
  totalTime: "PT15M",
  steps: [
    {
      title: "Pick a template",
      body: "Choose from ATS-friendly, modern, professional and creative designs. Switch any time without losing content.",
      icon: "layout-template",
    },
    {
      title: "Let AI write it — or write it yourself",
      body: "Get a full first draft in under a minute, or use AI one bullet at a time. You approve every change.",
      icon: "wand",
    },
    {
      title: "Download and apply",
      body: "Run the ATS check, then download a PDF or Word file. No sign-up required.",
      icon: "download",
    },
  ],
} satisfies SectionHeader & { totalTime: string; steps: FeatureItem[] };

export const buildPaths = {
  eyebrow: "Two ways to start",
  title: "Write it your way",
  paths: [
    {
      title: "Let AI write it for me",
      body: "Tell us your job title, years of experience and a few rough notes. Our AI drafts the whole resume and marks anything you need to confirm — it never invents employers, dates or numbers.",
      icon: "sparkles",
      cta: { label: "Create with AI", href: "/resume/start" },
      tone: "primary",
    },
    {
      title: "Get inspired by expert samples",
      body: "Browse samples written for your field and level. Pick one, and we’ll load it into the builder with the parts to personalise clearly highlighted.",
      icon: "file-text",
      cta: { label: "Browse samples", href: "/resume/samples" },
      tone: "raised",
    },
  ],
} satisfies SectionHeader & {
  paths: Array<FeatureItem & { cta: Cta; tone: "primary" | "raised" }>;
};

export const aiDemo = {
  eyebrow: "The AI writer",
  title: "From “responsible for” to results",
  intro:
    "Scroll to watch a vague bullet become a specific, action-led one. You stay in control: every suggestion is a draft you accept or reject.",
  beforeLabel: "Before",
  afterLabel: "After AI",
  before: "Responsible for managing the warehouse team and helping with shipping problems.",
  after:
    "Led an 18-person warehouse team, cutting shipping errors by [X%] and order-to-ship time by [X days].",
  placeholderNote:
    "Numbers in [brackets] are placeholders — the AI never invents your metrics. You fill them in.",
  scoreLabel: "Bullet strength",
  scoreFrom: 34,
  scoreTo: 91,
  cta: { label: "Try the AI writer", href: "/resume/start" },
} satisfies z.input<typeof aiDemoContent>;

export const coverLetterPromo = {
  eyebrow: "Cover letters",
  title: "A cover letter that sounds like you — in minutes",
  body: "Paste the job post, pick a tone, and pull details straight from your resume. The AI writes a tailored hook, body and close; you fine-tune any paragraph with one click.",
  points: [
    "Matches your resume’s design",
    "Professional, enthusiastic or concise tone",
    "Free PDF & Word download",
  ],
  primaryCta: { label: "Write My Cover Letter", href: "/cover-letter/start" },
  secondaryCta: { label: "See cover letter samples", href: "/cover-letter/samples" },
  letter: {
    label: "Sample",
    greeting: "Dear Ms. Patel,",
    paragraphs: [
      "When I read that Lakeside Clinic is opening a second site this spring, I knew my experience scaling patient intake would be useful from day one.",
      "At Northwind Health (fictional) I redesigned scheduling for three departments, reducing average wait times while keeping satisfaction scores high.",
    ],
    closing: "Warm regards,",
    signature: "Sam Okafor",
  },
};

export const sectionTitles = {
  categories: {
    eyebrow: "Resume samples",
    title: "Find a sample for your field",
    intro: "Written for each career area and level — entry, mid and senior.",
  },
  templates: {
    eyebrow: "Templates",
    title: "Designs recruiters and ATS both like",
    intro: "Real, selectable text and standard headings in every template.",
  },
  testimonials: { eyebrow: "Reviews", title: "What job seekers say" },
  tips: { eyebrow: "Resume tips", title: "Small changes that get more callbacks" },
  faq: { eyebrow: "FAQ", title: "Questions, answered" },
  trust: { title: "Trusted by job seekers" },
} satisfies Record<string, SectionHeader>;

export const finalCta = {
  title: "Your next job starts with a great resume.",
  body: "Free to build, free to download. Ready in minutes.",
  primaryCta: { label: "Create My Resume", href: "/resume/start" },
  secondaryCta: { label: "Upload My Resume", href: "/resume/upload" },
};

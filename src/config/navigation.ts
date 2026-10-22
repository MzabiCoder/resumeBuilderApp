/** All chrome navigation is data — components render whatever is here. */

export interface NavLink {
  label: string;
  href: string;
  description?: string;
  /** e.g. "Coming soon" */
  badge?: string;
}

export interface NavGroup {
  label: string;
  links: readonly NavLink[];
}

export const mainNav: readonly NavGroup[] = [
  {
    label: "Resume",
    links: [
      {
        label: "Resume Builder",
        href: "/resume/start",
        description: "Write it with AI, start from a sample, or upload yours.",
      },
      {
        label: "Resume Samples",
        href: "/resume/samples",
        description: "Expert-style examples for 9 career fields.",
      },
      {
        label: "Resume Templates",
        href: "/resume/templates",
        description: "ATS-friendly, modern, professional and creative designs.",
      },
    ],
  },
  {
    label: "Cover Letter",
    links: [
      {
        label: "Cover Letter Builder",
        href: "/cover-letter/start",
        description: "A tailored letter in minutes, matched to your resume.",
      },
      {
        label: "Cover Letter Samples",
        href: "/cover-letter/samples",
        description: "Real-world structure you can adapt.",
      },
    ],
  },
];

export const authLinks = {
  signIn: { label: "Sign In", href: "/sign-in" },
  signUp: { label: "Sign Up", href: "/sign-up" },
  getStarted: { label: "Get Started", href: "/resume/start" },
  documents: { label: "My Documents", href: "/dashboard" },
  account: { label: "Account", href: "/account" },
  privacyCenter: { label: "Privacy Center", href: "/privacy-center" },
  signOut: { label: "Sign Out", href: "/sign-out" },
} as const satisfies Record<string, NavLink>;

export const footerColumns: readonly NavGroup[] = [
  {
    label: "Job Seekers",
    links: [
      { label: "Resume Builder", href: "/resume/start" },
      { label: "Resume Samples", href: "/resume/samples" },
      { label: "Cover Letter Builder", href: "/cover-letter/start" },
      { label: "Cover Letter Samples", href: "/cover-letter/samples" },
      { label: "Apps", href: "/apps", badge: "Coming soon" },
    ],
  },
  {
    label: "Help",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "About Us", href: "/about" },
      { label: "Sitemap", href: "/sitemap" },
    ],
  },
];

export const legalLinks: readonly NavLink[] = [
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
  { label: "Privacy Center", href: "/privacy-center" },
];

import { RESUME_SCHEMA_VERSION, type ResumeDocument } from "@/lib/resume/schema";

/**
 * Fictional sample used for template previews (screenshots) and gallery tiles.
 * Deterministic (fixed ids/dates) so exported preview images are reproducible.
 */
export const sampleResumeDoc: ResumeDocument = {
  version: RESUME_SCHEMA_VERSION,
  id: "sample",
  templateId: "clarity",
  updatedAt: "2026-01-01T00:00:00.000Z",
  contact: {
    firstName: "Jordan",
    lastName: "Rivera",
    title: "Senior Product Designer",
    email: "jordan.rivera@example.com",
    phone: "(555) 010-4477",
    city: "Austin",
    region: "TX",
    linkedin: "linkedin.com/in/jordan-rivera",
    website: "",
  },
  summary:
    "Product designer with 8 years of experience turning complex workflows into clear, accessible tools. Led design for products used by 2M+ people, partnering closely with research and engineering to ship measurable improvements.",
  experience: [
    {
      id: "s-exp-1",
      role: "Senior Product Designer",
      employer: "Northwind Health",
      location: "Austin, TX",
      start: "2022-03",
      end: "",
      current: true,
      bullets: [
        "Redesigned appointment booking, cutting drop-off by 31% and support calls by 18%.",
        "Built and documented a 90-component design system adopted by 6 product teams.",
        "Led accessibility audit and fixes; app reached WCAG 2.2 AA across all core flows.",
      ],
    },
    {
      id: "s-exp-2",
      role: "Product Designer",
      employer: "Fieldnote",
      location: "Remote",
      start: "2019-01",
      end: "2022-02",
      current: false,
      bullets: [
        "Owned onboarding for a B2B analytics app; trial-to-paid conversion rose from 9% to 14%.",
        "Ran 40+ usability sessions and turned findings into a prioritized roadmap.",
        "Shipped a mobile companion app rated 4.7 stars from 12K reviews.",
      ],
    },
    {
      id: "s-exp-3",
      role: "UX Designer",
      employer: "Brightline Agency",
      location: "Dallas, TX",
      start: "2017-06",
      end: "2018-12",
      current: false,
      bullets: [
        "Designed responsive sites for 15 clients in retail, finance and education.",
        "Introduced prototype testing that reduced late-stage revisions by about half.",
      ],
    },
  ],
  education: [
    {
      id: "s-edu-1",
      school: "University of Texas at Austin",
      degree: "B.F.A.",
      field: "Design",
      location: "Austin, TX",
      start: "2013-08",
      end: "2017-05",
      details: "Minor in Human–Computer Interaction.",
    },
  ],
  skills: [
    { id: "s-sk-1", name: "Figma", level: 5 },
    { id: "s-sk-2", name: "Design systems", level: 5 },
    { id: "s-sk-3", name: "Usability testing", level: 4 },
    { id: "s-sk-4", name: "Prototyping", level: 4 },
    { id: "s-sk-5", name: "Accessibility (WCAG)", level: 4 },
    { id: "s-sk-6", name: "Information architecture", level: 0 },
    { id: "s-sk-7", name: "HTML & CSS", level: 3 },
    { id: "s-sk-8", name: "Workshop facilitation", level: 0 },
  ],
};

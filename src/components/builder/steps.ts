import type { ResumeDocument } from "@/lib/resume/schema";

export const builderSteps = [
  {
    id: "contact",
    label: "Contact",
    title: "How can employers reach you?",
    description: "Start with the basics. Only add what you’re comfortable sharing.",
  },
  {
    id: "experience",
    label: "Experience",
    title: "Tell us about your work history",
    description: "Start with your most recent role. Internships, volunteering and freelance count.",
  },
  {
    id: "education",
    label: "Education",
    title: "Add your education",
    description: "Degrees, diplomas, certificates and bootcamps all belong here.",
  },
  {
    id: "skills",
    label: "Skills",
    title: "What are you good at?",
    description: "Aim for 6–12 skills that match the jobs you want.",
  },
  {
    id: "summary",
    label: "Summary",
    title: "Write a short summary",
    description: "Two to four sentences: who you are, what you’re great at, what you want next.",
  },
  {
    id: "finalize",
    label: "Finish",
    title: "Review and download",
    description: "Pick a template, check the preview, then download your PDF.",
  },
] as const;

export type BuilderStep = (typeof builderSteps)[number];
export type BuilderStepId = BuilderStep["id"];

export const builderStepIds = builderSteps.map((s) => s.id);

export function isBuilderStepId(value: string): value is BuilderStepId {
  return (builderStepIds as readonly string[]).includes(value);
}

export const builderStepHref = (id: BuilderStepId) => `/resume/builder/${id}`;

const filled = (s: string) => s.trim().length > 0;

/** A step counts as complete once it has meaningful content (all steps are optional). */
export function isStepComplete(id: BuilderStepId, doc: ResumeDocument): boolean {
  switch (id) {
    case "contact":
      return (
        filled(doc.contact.firstName) && (filled(doc.contact.email) || filled(doc.contact.phone))
      );
    case "experience":
      return doc.experience.some((e) => filled(e.role) || filled(e.employer));
    case "education":
      return doc.education.some((e) => filled(e.school) || filled(e.degree));
    case "skills":
      return doc.skills.some((s) => filled(s.name));
    case "summary":
      return filled(doc.summary);
    case "finalize":
      return false;
  }
}

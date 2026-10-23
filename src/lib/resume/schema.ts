import { z } from "zod";

// Zod v4 probes `new Function` to JIT-compile parsers; our CSP has no 'unsafe-eval',
// so that probe logs a CSP violation in the browser. Validation speed is irrelevant here.
z.config({ jitless: true });

/**
 * Resume document — the single source of truth rendered by every template.
 * Versioned: bump `RESUME_SCHEMA_VERSION` and add a step to `migrateResume`
 * whenever the persisted shape changes.
 */
export const RESUME_SCHEMA_VERSION = 1;

const text = (max: number) => z.string().max(max);
/** "YYYY-MM", "YYYY" (month unknown) or empty. */
const monthValue = z.union([z.literal(""), z.string().regex(/^\d{4}(-(0[1-9]|1[0-2]))?$/)]);

export const contactSchema = z.object({
  firstName: text(60),
  lastName: text(60),
  title: text(100),
  /** Stored leniently (drafts are saved mid-typing); format is validated in the UI. */
  email: text(254),
  phone: text(40),
  city: text(80),
  region: text(80),
  linkedin: text(200),
  website: text(200),
});
export type Contact = z.infer<typeof contactSchema>;

export const experienceSchema = z.object({
  id: z.string(),
  role: text(100),
  employer: text(100),
  location: text(100),
  start: monthValue,
  end: monthValue,
  current: z.boolean(),
  /** One achievement per entry; rendered as bullets. */
  bullets: z.array(text(400)).max(12),
});
export type Experience = z.infer<typeof experienceSchema>;

export const educationSchema = z.object({
  id: z.string(),
  school: text(120),
  degree: text(120),
  field: text(120),
  location: text(100),
  start: monthValue,
  end: monthValue,
  details: text(400),
});
export type Education = z.infer<typeof educationSchema>;

export const skillSchema = z.object({
  id: z.string(),
  name: text(60),
  /** 0 = not shown, 1–5 = proficiency. */
  level: z.number().int().min(0).max(5),
});
export type Skill = z.infer<typeof skillSchema>;

export const resumeSchema = z.object({
  version: z.literal(RESUME_SCHEMA_VERSION),
  id: z.string(),
  templateId: z.string(),
  updatedAt: z.string(),
  contact: contactSchema,
  summary: text(1200),
  experience: z.array(experienceSchema).max(20),
  education: z.array(educationSchema).max(10),
  skills: z.array(skillSchema).max(40),
});
export type ResumeDocument = z.infer<typeof resumeSchema>;

export const DEFAULT_TEMPLATE_ID = "clarity";

export function newId(prefix = "id"): string {
  const rand =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID().slice(0, 8)
      : Math.random().toString(36).slice(2, 10);
  return `${prefix}_${rand}`;
}

export const emptyContact = (): Contact => ({
  firstName: "",
  lastName: "",
  title: "",
  email: "",
  phone: "",
  city: "",
  region: "",
  linkedin: "",
  website: "",
});

export const emptyExperience = (): Experience => ({
  id: newId("exp"),
  role: "",
  employer: "",
  location: "",
  start: "",
  end: "",
  current: false,
  bullets: [""],
});

export const emptyEducation = (): Education => ({
  id: newId("edu"),
  school: "",
  degree: "",
  field: "",
  location: "",
  start: "",
  end: "",
  details: "",
});

export const emptySkill = (): Skill => ({ id: newId("skill"), name: "", level: 0 });

export function createEmptyResume(templateId = DEFAULT_TEMPLATE_ID): ResumeDocument {
  return {
    version: RESUME_SCHEMA_VERSION,
    id: newId("resume"),
    templateId,
    updatedAt: new Date(0).toISOString(),
    contact: emptyContact(),
    summary: "",
    experience: [],
    education: [],
    skills: [],
  };
}

/**
 * Upgrade any previously persisted shape to the current version.
 * Returns null when the input can't be salvaged.
 */
export function migrateResume(input: unknown): ResumeDocument | null {
  if (!input || typeof input !== "object") return null;
  const candidate = { ...(input as Record<string, unknown>) };
  // v0 (pre-release drafts) had no version field and a single `name` string.
  if (candidate.version === undefined) {
    const contact = { ...emptyContact(), ...(candidate.contact as object | undefined) };
    if (typeof candidate.name === "string" && !contact.firstName) {
      const [first = "", ...rest] = candidate.name.trim().split(/\s+/);
      contact.firstName = first;
      contact.lastName = rest.join(" ");
    }
    delete candidate.name;
    Object.assign(candidate, { version: 1, contact });
  }
  const parsed = resumeSchema.safeParse({ ...createEmptyResume(), ...candidate });
  return parsed.success ? parsed.data : null;
}

/** UI-level validation (blank is allowed — fields are optional). */
export const emailFormat = z.union([z.literal(""), z.email()]);
export function emailError(value: string): string | undefined {
  return emailFormat.safeParse(value.trim()).success
    ? undefined
    : "Enter an email like name@example.com.";
}

/** "2021-03" → "Mar 2021"; "2021" → "2021"; empty → "". Locale-stable (en-US) for print parity. */
export function formatMonth(value: string): string {
  if (!value) return "";
  const [y, m] = value.split("-").map(Number);
  if (!y) return "";
  if (!m) return String(y);
  return new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function formatRange(start: string, end: string, current = false): string {
  const a = formatMonth(start);
  const b = current ? "Present" : formatMonth(end);
  if (a && b) return `${a} – ${b}`;
  return a || b;
}

export function fullName(c: Contact): string {
  return [c.firstName, c.lastName].filter(Boolean).join(" ").trim();
}

import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { formatRange, fullName, type ResumeDocument, type Skill } from "@/lib/resume/schema";
import { templates } from "@/content/templates";

/**
 * Shared, ATS-safe single-column renderer. Templates differ only by `TemplateTheme`
 * (type, spacing, heading treatment), so every template emits the same semantic
 * structure: article › h2 name › h3 sections › h4 entries, real text, no tables,
 * no icons carrying information, links as plain text (clean print/ATS parsing).
 *
 * Colours are hard-coded print colours (via `.resume-paper` vars), never theme
 * tokens: the paper looks identical in dark mode, on screen and in the PDF.
 */
export interface TemplateTheme {
  id: string;
  /** Root: font family, base size, padding. */
  root: string;
  header: string;
  name: string;
  title: string;
  contact: string;
  section: string;
  heading: string;
  entryTitle: string;
  meta: string;
  body: string;
  bullets: string;
  /** "inline" = comma list; "columns" = two-column list. */
  skills: "inline" | "columns";
  sectionTitles?: Partial<Record<SectionKey, string>>;
}

type SectionKey = "summary" | "experience" | "education" | "skills";

const defaultTitles: Record<SectionKey, string> = {
  summary: "Summary",
  experience: "Experience",
  education: "Education",
  skills: "Skills",
};

export const PLACEHOLDER_NAME = "Your Name";

export function accentFor(id: string): string {
  return templates.find((t) => t.id === id)?.accent ?? "#141726";
}

export function skillLevelLabel(level: number): string | null {
  if (level >= 4) return "Advanced";
  if (level === 3) return "Intermediate";
  if (level >= 1) return "Beginner";
  return null;
}

export function skillText(skill: Skill): string {
  const level = skillLevelLabel(skill.level);
  return level ? `${skill.name.trim()} (${level})` : skill.name.trim();
}

const nonEmpty = (s: string) => s.trim().length > 0;

export function contactLine(doc: ResumeDocument): string {
  const c = doc.contact;
  const place = [c.city, c.region].filter(nonEmpty).join(", ");
  return [c.email, c.phone, place, c.linkedin, c.website].filter(nonEmpty).join(" · ");
}

export function visibleSections(doc: ResumeDocument) {
  const experience = doc.experience.filter(
    (e) => nonEmpty(e.role) || nonEmpty(e.employer) || e.bullets.some(nonEmpty),
  );
  const education = doc.education.filter(
    (e) => nonEmpty(e.school) || nonEmpty(e.degree) || nonEmpty(e.field),
  );
  const skills = doc.skills.filter((s) => nonEmpty(s.name));
  return { summary: doc.summary.trim(), experience, education, skills };
}

function Section({
  theme,
  k,
  idPrefix,
  children,
}: {
  theme: TemplateTheme;
  k: SectionKey;
  idPrefix: string;
  children: ReactNode;
}) {
  return (
    <section className={theme.section} aria-labelledby={`${idPrefix}-${k}`}>
      <h3 id={`${idPrefix}-${k}`} className={theme.heading}>
        {theme.sectionTitles?.[k] ?? defaultTitles[k]}
      </h3>
      {children}
    </section>
  );
}

export function ResumeLayout({
  doc,
  theme,
  className,
  idPrefix = `resume-${theme.id}`,
}: {
  doc: ResumeDocument;
  theme: TemplateTheme;
  className?: string;
  /** Must be unique per rendered copy (preview vs print copy). */
  idPrefix?: string;
}) {
  const name = fullName(doc.contact);
  const contact = contactLine(doc);
  const { summary, experience, education, skills } = visibleSections(doc);
  const style = { "--accent": accentFor(theme.id) } as CSSProperties;

  return (
    <article
      aria-label="Resume preview"
      data-template={theme.id}
      style={style}
      className={cn(
        "resume-paper min-h-[1056px] w-[816px] text-left break-words text-(--ink)",
        theme.root,
        className,
      )}
    >
      <header className={theme.header}>
        <h2 className={cn(theme.name, !name && "text-[#676d82]")}>{name || PLACEHOLDER_NAME}</h2>
        {nonEmpty(doc.contact.title) ? <p className={theme.title}>{doc.contact.title}</p> : null}
        {contact ? <p className={theme.contact}>{contact}</p> : null}
      </header>

      {summary ? (
        <Section theme={theme} idPrefix={idPrefix} k="summary">
          <p className={cn(theme.body, "whitespace-pre-line")}>{summary}</p>
        </Section>
      ) : null}

      {experience.length > 0 ? (
        <Section theme={theme} idPrefix={idPrefix} k="experience">
          {experience.map((e) => {
            const range = formatRange(e.start, e.end, e.current);
            const where = [e.employer, e.location].filter(nonEmpty).join(" · ");
            const bullets = e.bullets.filter(nonEmpty);
            return (
              <div key={e.id} className="mt-3 break-inside-avoid first-of-type:mt-0">
                <div className="flex items-baseline justify-between gap-4">
                  <h4 className={theme.entryTitle}>{e.role || e.employer}</h4>
                  {range ? <p className={cn(theme.meta, "shrink-0")}>{range}</p> : null}
                </div>
                {where && e.role ? <p className={theme.meta}>{where}</p> : null}
                {bullets.length > 0 ? (
                  <ul className={cn(theme.bullets, "list-disc pl-5")}>
                    {bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            );
          })}
        </Section>
      ) : null}

      {education.length > 0 ? (
        <Section theme={theme} idPrefix={idPrefix} k="education">
          {education.map((e) => {
            const range = formatRange(e.start, e.end);
            const credential = [e.degree, e.field].filter(nonEmpty).join(", ");
            const where = [e.school, e.location].filter(nonEmpty).join(" · ");
            return (
              <div key={e.id} className="mt-3 break-inside-avoid first-of-type:mt-0">
                <div className="flex items-baseline justify-between gap-4">
                  <h4 className={theme.entryTitle}>{credential || e.school}</h4>
                  {range ? <p className={cn(theme.meta, "shrink-0")}>{range}</p> : null}
                </div>
                {credential && where ? <p className={theme.meta}>{where}</p> : null}
                {nonEmpty(e.details) ? <p className={theme.body}>{e.details}</p> : null}
              </div>
            );
          })}
        </Section>
      ) : null}

      {skills.length > 0 ? (
        <Section theme={theme} idPrefix={idPrefix} k="skills">
          {theme.skills === "columns" ? (
            <ul className={cn(theme.body, "columns-2 gap-8")}>
              {skills.map((s) => (
                <li key={s.id} className="break-inside-avoid">
                  {skillText(s)}
                </li>
              ))}
            </ul>
          ) : (
            <p className={theme.body}>{skills.map(skillText).join(", ")}</p>
          )}
        </Section>
      ) : null}
    </article>
  );
}

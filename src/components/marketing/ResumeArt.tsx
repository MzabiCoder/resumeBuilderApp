import type { SampleResume } from "@/content/schema";
import { cn } from "@/lib/cn";

export interface ResumeArtProps {
  resume: SampleResume;
  className?: string;
}

/**
 * Live-rendered sample resume (real text, zero JS, no image request).
 * Fixed aspect ratio → no layout shift. Carries `data-anim` hooks for HeroMotion;
 * it renders its final state and never depends on motion to be complete.
 */
export function ResumeArt({ resume, className }: ResumeArtProps) {
  const label = `${resume.label} resume for ${resume.name}, ${resume.title}. ${resume.strength.label}: ${resume.strength.value} out of 100.`;
  return (
    <figure role="img" aria-label={label} className={cn("relative", className)} data-anim="resume">
      <div className="resume-paper relative aspect-[8.5/11] w-full overflow-hidden rounded-md p-[7%] text-[clamp(0.5625rem,0.45rem+0.45vw,0.75rem)] leading-snug shadow-paper">
        <span className="absolute top-3 right-3 rounded-full bg-[#fde8df] px-2 py-0.5 text-[0.85em] font-bold text-[#b23c15] uppercase">
          {resume.label}
        </span>
        <header data-anim="resume-section" className="border-b-2 border-[#2f3bc9] pb-[4%]">
          <p data-anim="type" className="font-display text-[2.3em] leading-none font-semibold">
            {resume.name}
          </p>
          <p data-anim="type" className="mt-1 text-[1.15em] font-semibold text-[#2f3bc9]">
            {resume.title}
          </p>
          <p className="mt-1.5 text-[#4a5068]">{resume.contact.join("  ·  ")}</p>
        </header>
        <section data-anim="resume-section" className="mt-[5%]">
          <p className="mb-1 text-[0.9em] font-bold tracking-[0.12em] text-[#2f3bc9] uppercase">
            Summary
          </p>
          <p data-anim="type">{resume.summary}</p>
        </section>
        <section data-anim="resume-section" className="mt-[5%]">
          <p className="mb-1 text-[0.9em] font-bold tracking-[0.12em] text-[#2f3bc9] uppercase">
            Experience
          </p>
          {resume.experience.map((job) => (
            <div key={job.role + job.org} className="mb-[3%]">
              <p className="flex justify-between gap-2 font-semibold">
                <span>
                  {job.role}, {job.org}
                </span>
                <span className="shrink-0 font-normal text-[#4a5068]">{job.dates}</span>
              </p>
              <ul className="mt-0.5 list-disc pl-[1.2em]">
                {job.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
        <section data-anim="resume-section" className="mt-[4%]">
          <p className="mb-1 text-[0.9em] font-bold tracking-[0.12em] text-[#2f3bc9] uppercase">
            Skills
          </p>
          <p className="flex flex-wrap gap-1">
            {resume.skills.map((s) => (
              <span key={s} className="rounded bg-[#e8eafd] px-1.5 py-0.5">
                {s}
              </span>
            ))}
          </p>
        </section>
      </div>
      <div
        data-anim="badge"
        className="absolute -bottom-5 -left-4 flex items-center gap-3 rounded-lg bg-surface-raised px-4 py-3 shadow-lg sm:-left-10"
      >
        <span
          className="font-display text-3xl font-semibold text-success tabular-nums"
          data-anim="score"
          data-value={resume.strength.value}
        >
          {resume.strength.value}
        </span>
        <span className="text-sm leading-tight font-semibold text-ink">
          {resume.strength.label}
          <span className="block font-normal text-ink-muted">out of 100</span>
        </span>
      </div>
      <ul className="absolute -top-4 -right-3 flex flex-col items-end gap-2 sm:-right-8">
        {resume.badges.map((b) => (
          <li
            key={b}
            data-anim="badge"
            className="rounded-full bg-ink px-3 py-1.5 text-xs font-semibold text-ink-inverse shadow-md"
          >
            ✓ {b}
          </li>
        ))}
      </ul>
    </figure>
  );
}

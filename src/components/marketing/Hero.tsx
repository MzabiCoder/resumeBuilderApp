import type { ReactNode } from "react";
import { Check } from "lucide-react";
import type { z } from "zod";
import type { heroContent } from "@/content/schema";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Link";
import { ResumeArt } from "./ResumeArt";

export interface HeroProps {
  content: z.infer<typeof heroContent>;
  /** Optional behaviour layer (e.g. <HeroMotion />). Renders no content of its own. */
  behavior?: ReactNode;
}

/** #hero — the headline (LCP element) is static text; only the resume visual animates. */
export function Hero({ content, behavior }: HeroProps) {
  return (
    <section id="hero" aria-labelledby="hero-title" data-showpiece="hero" className="hero relative isolate overflow-hidden">
      {/* Decorative backdrop — behind content, hidden from AT. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(60rem_30rem_at_85%_10%,var(--primary-soft),transparent_70%),radial-gradient(40rem_24rem_at_0%_100%,var(--accent-soft),transparent_70%)]" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <Container size="wide" className="grid items-center gap-16 pt-12 pb-24 sm:pt-20 lg:grid-cols-[1.1fr_1fr] lg:gap-10 lg:pb-32">
        <div className="flex flex-col items-start gap-7">
          <p className="hero-eyebrow rounded-full border border-border bg-surface-raised px-3.5 py-1.5 text-sm font-semibold text-ink shadow-sm">
            <span aria-hidden="true" className="mr-2 inline-block size-2 rounded-full bg-accent align-middle" />
            {content.eyebrow}
          </p>
          <h1 id="hero-title" className="hero-headline max-w-[14ch] text-display-xl font-semibold">
            {content.headline}{" "}
            <span className="relative inline-block text-primary">
              {content.headlineAccent}
              <svg aria-hidden="true" viewBox="0 0 200 20" preserveAspectRatio="none" className="absolute -bottom-[0.12em] left-0 h-[0.22em] w-full text-accent">
                <path d="M2 14C40 5 120 2 198 9" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="hero-subhead max-w-xl text-lead text-ink-muted">{content.subhead}</p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row" data-anim="hero-cta">
            <ButtonLink href={content.primaryCta.href} size="lg" prefetch>
              {content.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={content.secondaryCta.href} size="lg" variant="outline">
              {content.secondaryCta.label}
            </ButtonLink>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-ink">
            {content.points.map((p) => (
              <li key={p} className="flex items-center gap-1.5">
                <Check aria-hidden="true" className="size-4 text-success" strokeWidth={3} />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="mx-auto w-full max-w-[25rem] lg:max-w-[28rem] lg:rotate-[1.5deg]">
          <ResumeArt resume={content.resume} />
        </div>
      </Container>
      {behavior}
    </section>
  );
}

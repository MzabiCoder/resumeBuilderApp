import type { ReactNode } from "react";
import { ArrowDown, Sparkles } from "lucide-react";
import type { z } from "zod";
import type { aiDemoContent } from "@/content/schema";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Link";

export interface AiWriterDemoProps {
  content: z.infer<typeof aiDemoContent>;
  /** Optional behaviour layer (<AiDemoMotion />). */
  behavior?: ReactNode;
}

/** Wrap `[placeholders]` so they're visibly marked as "fill this in". */
function withPlaceholders(text: string) {
  return text.split(/(\[[^\]]+\])/g).map((part, i) =>
    /^\[[^\]]+\]$/.test(part) ? (
      <mark key={i} className="rounded bg-accent-soft px-1 font-semibold text-accent-strong">
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

/**
 * #ai-writer showpiece content. Server-rendered in its FINAL state (struck "before",
 * full "after", final score) — the motion layer only animates toward this state.
 */
export function AiWriterDemo({ content, behavior }: AiWriterDemoProps) {
  const pct = Math.round(content.scoreTo);
  return (
    <Section
      id="ai-writer"
      eyebrow={content.eyebrow}
      title={content.title}
      intro={content.intro}
      tone="sunken"
      data-showpiece="ai-demo"
    >
      <div data-anim="ai-stage" className="mx-auto grid max-w-4xl gap-4">
        <figure className="rounded-xl border border-border bg-surface-raised p-6 sm:p-8">
          <figcaption className="mb-3 text-sm font-semibold tracking-[0.12em] text-ink-muted uppercase">
            {content.beforeLabel}
          </figcaption>
          <p
            data-anim="ai-before"
            className="text-lead text-ink-muted line-through decoration-danger/90 decoration-2"
          >
            {content.before}
          </p>
        </figure>
        <div aria-hidden="true" className="flex justify-center text-primary">
          <span className="grid size-11 place-items-center rounded-full bg-primary text-on-primary shadow-md">
            <ArrowDown className="size-5" />
          </span>
        </div>
        <figure className="relative rounded-xl border-2 border-primary bg-surface-raised p-6 shadow-lg sm:p-8">
          <figcaption className="mb-3 flex items-center gap-2 text-sm font-semibold tracking-[0.12em] text-primary uppercase">
            <Sparkles aria-hidden="true" className="size-4" />
            {content.afterLabel}
          </figcaption>
          <p data-anim="ai-after" className="font-display text-display-sm font-medium text-ink">
            {withPlaceholders(content.after)}
          </p>
          <p className="mt-4 text-sm text-ink-muted">{content.placeholderNote}</p>
          <div className="mt-6 flex items-center gap-4">
            <span className="text-sm font-semibold text-ink">{content.scoreLabel}</span>
            <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-surface-sunken">
              <div
                data-anim="ai-meter"
                data-from={content.scoreFrom}
                data-to={content.scoreTo}
                className="h-full origin-left rounded-full bg-success"
                style={{ transform: `scaleX(${pct / 100})` }}
              />
            </div>
            <span className="w-16 text-right text-sm font-semibold text-ink tabular-nums">
              <span data-anim="ai-score" data-from={content.scoreFrom} data-to={content.scoreTo}>
                {pct}
              </span>
              <span className="text-ink-muted">/100</span>
            </span>
          </div>
        </figure>
        <ButtonLink href={content.cta.href} size="lg" className="mt-6 justify-self-center">
          {content.cta.label}
        </ButtonLink>
      </div>
      {behavior}
    </Section>
  );
}

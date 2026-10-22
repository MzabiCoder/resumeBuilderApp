import { Check } from "lucide-react";
import type { Cta } from "@/content/schema";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Link";
import { LetterArt, type LetterArtProps } from "./LetterArt";

export interface CoverLetterPromoProps {
  eyebrow: string;
  title: string;
  body: string;
  points: readonly string[];
  primaryCta: Cta;
  secondaryCta: Cta;
  letter: LetterArtProps["letter"];
}

/** #cover-letters */
export function CoverLetterPromo({
  eyebrow,
  title,
  body,
  points,
  primaryCta,
  secondaryCta,
  letter,
}: CoverLetterPromoProps) {
  return (
    <section
      id="cover-letters"
      aria-labelledby="cover-letters-title"
      className="overflow-hidden bg-primary-soft py-16 sm:py-24"
    >
      <Container size="wide" className="grid items-center gap-14 lg:grid-cols-2">
        <div className="order-2 mx-auto w-full max-w-md lg:order-1 lg:-rotate-2">
          <LetterArt letter={letter} />
        </div>
        <div className="order-1 flex flex-col items-start gap-6 lg:order-2">
          <p className="text-sm font-semibold tracking-[0.14em] text-primary uppercase">
            {eyebrow}
          </p>
          <h2 id="cover-letters-title" className="text-display-md font-semibold">
            {title}
          </h2>
          <p className="text-lead text-ink-muted">{body}</p>
          <ul className="flex flex-col gap-2">
            {points.map((p) => (
              <li key={p} className="flex items-center gap-2 font-medium">
                <Check aria-hidden="true" className="size-5 text-success" strokeWidth={3} />
                {p}
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={primaryCta.href} size="lg">
              {primaryCta.label}
            </ButtonLink>
            <ButtonLink href={secondaryCta.href} size="lg" variant="ghost">
              {secondaryCta.label}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}

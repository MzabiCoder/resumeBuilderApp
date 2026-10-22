import type { Cta } from "@/content/schema";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Link";

export interface FinalCtaProps {
  title: string;
  body: string;
  primaryCta: Cta;
  secondaryCta?: Cta;
}

/** #get-started */
export function FinalCta({ title, body, primaryCta, secondaryCta }: FinalCtaProps) {
  return (
    <section id="get-started" aria-labelledby="get-started-title" className="px-3 pb-16 sm:px-6 sm:pb-24">
      <Container size="wide" className="relative isolate overflow-hidden rounded-xl bg-primary px-6 py-16 text-center text-on-primary sm:px-12 sm:py-24">
        <div aria-hidden="true" className="absolute -top-24 -right-24 -z-10 size-80 rounded-full bg-accent/40 blur-3xl" />
        <div aria-hidden="true" className="absolute -bottom-32 -left-20 -z-10 size-96 rounded-full bg-on-primary/10 blur-3xl" />
        <h2 id="get-started-title" className="mx-auto max-w-3xl text-display-lg font-semibold">
          {title}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lead opacity-90">{body}</p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href={primaryCta.href} variant="accent" size="lg" prefetch>
            {primaryCta.label}
          </ButtonLink>
          {secondaryCta ? (
            <ButtonLink href={secondaryCta.href} size="lg" className="border-2 border-on-primary/70 bg-transparent text-on-primary shadow-none hover:bg-on-primary hover:text-primary">
              {secondaryCta.label}
            </ButtonLink>
          ) : null}
        </div>
      </Container>
    </section>
  );
}

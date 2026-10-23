import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Link";
import { urls } from "@/config/urls";

export interface ComingSoonProps {
  title: string;
  children: ReactNode;
  primary?: { label: string; href: string };
}

/**
 * Honest placeholder for routes that are linked from the site but land in a later phase.
 * Always points people at what works today (the builder) — never a dead end.
 */
export function ComingSoon({
  title,
  children,
  primary = { label: "Build my resume", href: urls.resumeStart },
}: ComingSoonProps) {
  return (
    <Container size="prose" className="flex flex-col gap-5 py-16 sm:py-24">
      <p className="text-sm font-semibold tracking-[0.14em] text-accent-strong uppercase">Coming soon</p>
      <h1 className="text-display-md font-semibold">{title}</h1>
      <div className="flex flex-col gap-3 text-lead text-ink-muted">{children}</div>
      <div className="flex flex-wrap gap-3 pt-2">
        <ButtonLink href={primary.href}>
          {primary.label}
          <ArrowRight aria-hidden="true" />
        </ButtonLink>
        <ButtonLink href="/" variant="outline">
          Back to home
        </ButtonLink>
      </div>
    </Container>
  );
}

import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { MarketingShell } from "@/components/layout/MarketingShell";
import { ButtonLink, Link } from "@/components/ui/Link";
import { mainNav } from "@/config/navigation";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  const helpful = mainNav.flatMap((g) => g.links);
  return (
    <MarketingShell>
      <Container size="prose" className="flex flex-col gap-6 py-24">
        <p
          className="font-display text-display-lg font-semibold text-accent-strong"
          aria-hidden="true"
        >
          404
        </p>
        <h1 className="text-display-md font-semibold">We couldn’t find that page.</h1>
        <p className="text-lead text-ink-muted">
          The link may be old or mistyped. Your documents are safe — here are some places to pick up
          from:
        </p>
        <ul className="flex flex-col gap-2">
          {helpful.map((l) => (
            <li key={l.href}>
              <Link href={l.href}>{l.label}</Link>
            </li>
          ))}
        </ul>
        <ButtonLink href="/" className="self-start">
          Back to home
        </ButtonLink>
      </Container>
    </MarketingShell>
  );
}

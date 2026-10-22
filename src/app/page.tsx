import { ButtonLink } from "@/components/ui/Link";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: `${siteConfig.name} — Free AI Resume Builder`,
  description: siteConfig.description,
  path: "/",
});

/** Phase 1 placeholder — Phase 2 replaces this with the full landing page from /content. */
export default function HomePage() {
  return (
    <Container className="flex flex-col items-start gap-6 py-24 sm:py-32">
      <p className="text-sm font-semibold tracking-[0.14em] text-accent-strong uppercase">
        100% free
      </p>
      <h1 className="max-w-4xl text-display-xl font-semibold">
        Create a resume that gets noticed — free.
      </h1>
      <p className="max-w-2xl text-lead text-ink-muted">{siteConfig.tagline}</p>
      <div className="flex flex-wrap gap-3">
        <ButtonLink href="/resume/start" size="lg" prefetch>
          Create My Resume
        </ButtonLink>
        <ButtonLink href="/resume/upload" size="lg" variant="outline">
          Upload My Resume
        </ButtonLink>
      </div>
    </Container>
  );
}

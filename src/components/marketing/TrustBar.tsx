import type { TrustEntry } from "@/content/schema";
import { Container } from "@/components/ui/Container";

export interface TrustBarProps {
  title: string;
  entries: readonly TrustEntry[];
}

/** #trusted-by — renders NOTHING unless at least one entry is verified. Employers are plain text, never logos. */
export function TrustBar({ title, entries }: TrustBarProps) {
  const verified = entries.filter((e) => e.verified);
  if (verified.length === 0) return null;
  return (
    <section
      id="trusted-by"
      aria-labelledby="trusted-by-title"
      className="border-y border-border py-10"
    >
      <Container size="wide" className="flex flex-col items-center gap-6 text-center">
        <h2
          id="trusted-by-title"
          className="font-sans text-sm font-semibold tracking-[0.14em] text-ink-muted uppercase"
        >
          {title}
        </h2>
        <ul className="flex flex-wrap justify-center gap-x-12 gap-y-4">
          {verified.map((e) => (
            <li key={e.id} className="flex flex-col">
              <span className="font-display text-display-sm font-semibold">{e.value}</span>
              {e.kind === "stat" ? <span className="text-sm text-ink-muted">{e.label}</span> : null}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

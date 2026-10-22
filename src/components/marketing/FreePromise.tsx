import type { FeatureItem } from "@/content/schema";
import { Container } from "@/components/ui/Container";
import { FeatureIcon } from "./FeatureIcon";

export interface FreePromiseProps {
  title: string;
  items: readonly FeatureItem[];
}

/** #free-promise — the core promise on an inverse band. */
export function FreePromise({ title, items }: FreePromiseProps) {
  return (
    <section id="free-promise" aria-labelledby="free-promise-title" className="bg-surface-inverse py-14 text-ink-inverse sm:py-16">
      <Container size="wide" className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
        <h2 id="free-promise-title" className="shrink-0 text-display-md font-semibold lg:w-64">
          {title}
        </h2>
        <ul className="grid flex-1 gap-8 sm:grid-cols-3">
          {items.map((item) => (
            <li key={item.title} className="flex flex-col gap-3">
              <FeatureIcon icon={item.icon} tone="inverse" />
              <h3 className="font-sans text-lg font-semibold">{item.title}</h3>
              <p className="opacity-80">{item.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

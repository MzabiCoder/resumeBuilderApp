import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container, type ContainerProps } from "./Container";

export interface SectionProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  /** Anchor ID — also used to derive the heading id for aria-labelledby. */
  id: string;
  eyebrow?: ReactNode;
  title?: ReactNode;
  intro?: ReactNode;
  /** Heading level; sections on a page default to h2. */
  as?: "h1" | "h2" | "h3";
  tone?: "default" | "raised" | "sunken" | "inverse" | "primary";
  align?: "start" | "center";
  containerSize?: ContainerProps["size"];
}

const tones = {
  default: "bg-surface text-ink",
  raised: "bg-surface-raised text-ink",
  sunken: "bg-surface-sunken text-ink",
  inverse: "bg-surface-inverse text-ink-inverse",
  primary: "bg-primary text-on-primary",
} as const;

/** Page section with a consistent vertical rhythm, optional header and landmark labelling. */
export function Section({
  id,
  eyebrow,
  title,
  intro,
  as: Heading = "h2",
  tone = "default",
  align = "start",
  containerSize,
  className,
  children,
  ...rest
}: SectionProps) {
  const headingId = title ? `${id}-title` : undefined;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn("py-16 sm:py-24", tones[tone], className)}
      {...rest}
    >
      <Container size={containerSize}>
        {title ? (
          <header
            className={cn(
              "mb-10 flex max-w-3xl flex-col gap-4 sm:mb-14",
              align === "center" && "mx-auto items-center text-center",
            )}
          >
            {eyebrow ? (
              <p className="text-sm font-semibold tracking-[0.14em] uppercase opacity-80">
                {eyebrow}
              </p>
            ) : null}
            <Heading id={headingId} className="text-display-md font-semibold">
              {title}
            </Heading>
            {intro ? <div className="text-lead opacity-85">{intro}</div> : null}
          </header>
        ) : null}
        {children}
      </Container>
    </section>
  );
}

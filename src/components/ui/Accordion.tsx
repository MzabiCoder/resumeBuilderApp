"use client";

import type { ComponentProps } from "react";
import { Accordion as A } from "radix-ui";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

export type AccordionProps = ComponentProps<typeof A.Root>;

export function Accordion({ className, ...rest }: AccordionProps) {
  return (
    <A.Root className={cn("divide-y divide-border border-y border-border", className)} {...rest} />
  );
}

export type AccordionItemProps = ComponentProps<typeof A.Item>;

export function AccordionItem({ className, ...rest }: AccordionItemProps) {
  return <A.Item className={cn("group", className)} {...rest} />;
}

export interface AccordionTriggerProps extends ComponentProps<typeof A.Trigger> {
  /** Heading level wrapping the trigger, to keep document outline correct. */
  headingLevel?: "h2" | "h3" | "h4";
}

export function AccordionTrigger({
  headingLevel = "h3",
  className,
  children,
  ...rest
}: AccordionTriggerProps) {
  const Heading = headingLevel;
  return (
    <A.Header asChild>
      <Heading className="font-sans">
        <A.Trigger
          className={cn(
            "flex w-full items-center justify-between gap-6 py-5 text-left text-lg font-semibold text-ink hover:text-primary",
            className,
          )}
          {...rest}
        >
          {children}
          <ChevronDown
            aria-hidden="true"
            className="size-5 shrink-0 transition-transform duration-(--duration-base) group-data-[state=open]:rotate-180"
          />
        </A.Trigger>
      </Heading>
    </A.Header>
  );
}

export type AccordionContentProps = ComponentProps<typeof A.Content>;

/** forceMount-free: Radix keeps closed content out of the a11y tree. For SEO-critical FAQ text, pass `forceMount` + hidden styling. */
export function AccordionContent({ className, children, ...rest }: AccordionContentProps) {
  return (
    <A.Content
      className={cn("pb-6 text-ink-muted data-[state=closed]:hidden", className)}
      {...rest}
    >
      <div className="max-w-prose leading-relaxed">{children}</div>
    </A.Content>
  );
}

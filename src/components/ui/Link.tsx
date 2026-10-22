import NextLink from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";
import { buttonVariants, type ButtonVariantProps } from "./button-variants";

type NextLinkProps = ComponentProps<typeof NextLink>;

export interface LinkProps extends NextLinkProps {
  /** `inline` = underlined body link, `nav` = chrome link, `plain` = unstyled. */
  tone?: "inline" | "nav" | "plain";
}

const tones = {
  inline:
    "font-medium text-primary underline decoration-primary/40 decoration-2 underline-offset-[0.2em] hover:decoration-primary",
  nav: "rounded-md text-ink-muted transition-colors duration-(--duration-fast) hover:text-ink",
  plain: "",
} as const;

/** Internal navigation link. External URLs get `rel="noopener noreferrer"` automatically. */
export function Link({ tone = "inline", className, href, ...rest }: LinkProps) {
  const external = typeof href === "string" && /^https?:\/\//.test(href);
  return (
    <NextLink
      href={href}
      className={cn(tones[tone], className)}
      {...(external ? { rel: "noopener noreferrer" } : {})}
      {...rest}
    />
  );
}

export interface ButtonLinkProps extends NextLinkProps, ButtonVariantProps {}

/** A link that looks like a button. Use for navigation; use `<Button>` for actions. */
export function ButtonLink({ variant, size, className, ...rest }: ButtonLinkProps) {
  return <NextLink className={cn(buttonVariants({ variant, size }), className)} {...rest} />;
}

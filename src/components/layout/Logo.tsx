import Image from "next/image";
import NextLink from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

export interface LogoProps {
  /** Link destination; pass `null` to render the image without a link. */
  href?: string | null;
  /** Set when placed on `surface-inverse` (e.g. the footer) so the contrasting variant shows. */
  onInverse?: boolean;
  className?: string;
}

/** Real logo image; light/dark variants swap via CSS so there is no hydration flash. */
export function Logo({ href = "/", onInverse = false, className }: LogoProps) {
  const { light, dark, width, height } = siteConfig.logo;
  const showOnLight = onInverse ? "hidden dark:block" : "dark:hidden";
  const showOnDark = onInverse ? "dark:hidden" : "hidden dark:block";
  const images = (
    <>
      <Image
        src={light}
        alt={siteConfig.name}
        width={width}
        height={height}
        unoptimized
        className={cn("h-8 w-auto", showOnLight)}
      />
      <Image
        src={dark}
        alt={siteConfig.name}
        width={width}
        height={height}
        unoptimized
        className={cn("h-8 w-auto", showOnDark)}
      />
    </>
  );
  if (href === null) return <span className={cn("inline-flex", className)}>{images}</span>;
  return (
    <NextLink href={href} className={cn("inline-flex shrink-0 rounded-md", className)}>
      {images}
      <span className="sr-only"> — home</span>
    </NextLink>
  );
}

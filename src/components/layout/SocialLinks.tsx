import { siFacebook, siInstagram, siX, siYoutube, type SimpleIcon } from "simple-icons";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

type Network = keyof typeof siteConfig.social;

const networks: Record<Network, { icon: SimpleIcon; label: string }> = {
  x: { icon: siX, label: "X (formerly Twitter)" },
  facebook: { icon: siFacebook, label: "Facebook" },
  instagram: { icon: siInstagram, label: "Instagram" },
  youtube: { icon: siYoutube, label: "YouTube" },
};

export interface SocialLinksProps {
  className?: string;
}

/** Icon links with accessible names. Server-rendered inline SVG — zero client JS. */
export function SocialLinks({ className }: SocialLinksProps) {
  const entries = Object.entries(siteConfig.social) as Array<[Network, string]>;
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {entries.map(([key, href]) => {
        const { icon, label } = networks[key];
        return (
          <li key={key}>
            <a
              href={href}
              rel="noopener noreferrer"
              className="grid size-11 place-items-center rounded-full border border-current/25 transition-colors hover:bg-ink-inverse hover:text-surface-inverse"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 24 24"
                className="size-5 fill-current"
              >
                <path d={icon.path} />
              </svg>
              <span className="sr-only">{`${siteConfig.name} on ${label}`}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

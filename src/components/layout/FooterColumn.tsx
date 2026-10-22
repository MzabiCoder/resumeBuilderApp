import type { ReactNode } from "react";
import type { NavLink } from "@/config/navigation";
import { Link } from "@/components/ui/Link";
import { Badge } from "@/components/ui/Badge";

export interface FooterColumnProps {
  title: string;
  links?: readonly NavLink[];
  /** Custom content instead of (or after) a link list. */
  children?: ReactNode;
}

export function FooterColumn({ title, links, children }: FooterColumnProps) {
  const headingId = `footer-${title.toLowerCase().replace(/\W+/g, "-")}`;
  return (
    <section aria-labelledby={headingId} className="flex flex-col gap-4">
      <h2
        id={headingId}
        className="font-sans text-sm font-semibold tracking-[0.12em] uppercase opacity-70"
      >
        {title}
      </h2>
      {links?.length ? (
        <ul className="flex flex-col gap-1">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                tone="plain"
                href={link.href}
                className="inline-flex min-h-8 items-center gap-2 rounded-sm opacity-90 hover:underline hover:opacity-100"
              >
                {link.label}
                {link.badge ? <Badge tone="accent">{link.badge}</Badge> : null}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
      {children}
    </section>
  );
}

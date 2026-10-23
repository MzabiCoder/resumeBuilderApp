import NextLink from "next/link";
import type { NavLink } from "@/config/navigation";

export interface NavDropdownProps {
  links: readonly NavLink[];
  onNavigate?: () => void;
}

/** Panel content for one MainNav group. */
export function NavDropdown({ links, onNavigate }: NavDropdownProps) {
  return (
    <ul className="grid w-[min(26rem,calc(100vw-2rem))] gap-1 p-2">
      {links.map((link) => (
        <li key={link.href}>
          <NextLink
            href={link.href}
            onClick={onNavigate}
            className="flex flex-col gap-0.5 rounded-lg px-4 py-3 hover:bg-surface-sunken focus-visible:bg-surface-sunken"
          >
            <span className="font-semibold text-ink">{link.label}</span>
            {link.description ? (
              <span className="text-sm text-ink-muted">{link.description}</span>
            ) : null}
          </NextLink>
        </li>
      ))}
    </ul>
  );
}

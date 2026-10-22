"use client";

import NextLink from "next/link";
import { LogOut } from "lucide-react";
import type { NavLink } from "@/config/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";

export interface UserMenuProps {
  name: string;
  image: string | null;
  links: readonly NavLink[];
  signOut: NavLink;
}

function initials(name: string): string {
  return name
    .split(/[\s@.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

/** Avatar menu for signed-in users. */
export function UserMenu({ name, image, links, signOut }: UserMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={`Account menu for ${name}`}
        className="grid size-11 place-items-center overflow-hidden rounded-full bg-primary-soft font-semibold text-primary"
      >
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element -- remote avatar of unknown host
          <img src={image} alt="" width={44} height={44} className="size-full object-cover" />
        ) : (
          <span aria-hidden="true">{initials(name)}</span>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{name}</DropdownMenuLabel>
        {links.map((link) => (
          <DropdownMenuItem key={link.href} asChild>
            <NextLink href={link.href}>{link.label}</NextLink>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild tone="danger">
          <NextLink href={signOut.href} prefetch={false}>
            <LogOut aria-hidden="true" />
            {signOut.label}
          </NextLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

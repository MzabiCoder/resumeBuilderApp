"use client";

import { NavigationMenu as N } from "radix-ui";
import { ChevronDown } from "lucide-react";
import type { NavGroup } from "@/config/navigation";
import { cn } from "@/lib/cn";
import { NavDropdown } from "./NavDropdown";

export interface MainNavProps {
  groups: readonly NavGroup[];
  className?: string;
}

/** Desktop primary navigation. Radix handles arrow keys, Esc and focus management. */
export function MainNav({ groups, className }: MainNavProps) {
  return (
    <N.Root aria-label="Main" className={cn("relative", className)} delayDuration={80}>
      <N.List className="flex items-center gap-1">
        {groups.map((group) => (
          <N.Item key={group.label}>
            <N.Trigger
              className={cn(
                "group flex min-h-11 items-center gap-1 rounded-full px-4 text-[0.9375rem] font-semibold text-ink",
                "hover:bg-surface-sunken data-[state=open]:bg-surface-sunken",
              )}
            >
              {group.label}
              <ChevronDown
                aria-hidden="true"
                className="size-4 transition-transform duration-(--duration-base) group-data-[state=open]:rotate-180"
              />
            </N.Trigger>
            <N.Content className="absolute top-0 left-0 w-full sm:w-auto">
              <NavDropdown links={group.links} />
            </N.Content>
          </N.Item>
        ))}
      </N.List>
      <div className="absolute top-full left-0 flex justify-start pt-2">
        <N.Viewport className="relative h-(--radix-navigation-menu-viewport-height) w-(--radix-navigation-menu-viewport-width) overflow-hidden rounded-xl border border-border bg-surface-raised shadow-lg transition-[width,height] duration-(--duration-base)" />
      </div>
    </N.Root>
  );
}

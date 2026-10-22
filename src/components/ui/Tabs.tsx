"use client";

import type { ComponentProps } from "react";
import { Tabs as T } from "radix-ui";
import { cn } from "@/lib/cn";

export const Tabs = T.Root;

export function TabsList({ className, ...rest }: ComponentProps<typeof T.List>) {
  return (
    <T.List
      className={cn("inline-flex flex-wrap gap-1 rounded-full bg-surface-sunken p-1", className)}
      {...rest}
    />
  );
}

export function TabsTrigger({ className, ...rest }: ComponentProps<typeof T.Trigger>) {
  return (
    <T.Trigger
      className={cn(
        "min-h-10 rounded-full px-4 text-sm font-semibold text-ink-muted transition-colors hover:text-ink",
        "data-[state=active]:bg-surface-raised data-[state=active]:text-ink data-[state=active]:shadow-sm",
        className,
      )}
      {...rest}
    />
  );
}

export function TabsContent({ className, ...rest }: ComponentProps<typeof T.Content>) {
  return <T.Content className={cn("mt-6", className)} {...rest} />;
}

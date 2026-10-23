"use client";

import { RouteErrorView, type RouteErrorProps } from "@/components/layout/RouteErrorView";

/** Root boundary: rendered without a group layout, so it provides the skip-link target. */
export default function RootError(props: RouteErrorProps) {
  return (
    <main id="main" tabIndex={-1} className="flex-1 focus-visible:outline-none">
      <RouteErrorView {...props} />
    </main>
  );
}

"use client";

import { RouteErrorView, type RouteErrorProps } from "@/components/layout/RouteErrorView";

/** Rendered inside the group layout, which already provides <main id="main">. */
export default function GroupError(props: RouteErrorProps) {
  return <RouteErrorView {...props} />;
}

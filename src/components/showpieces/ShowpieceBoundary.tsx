"use client";

import type { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { reportError } from "@/lib/report-error";

export interface ShowpieceBoundaryProps {
  children: ReactNode;
}

/** If a behaviour component throws while rendering, drop the behaviour — never the content. */
export function ShowpieceBoundary({ children }: ShowpieceBoundaryProps) {
  return (
    <ErrorBoundary fallback={null} onError={(error) => reportError(error)}>
      {children}
    </ErrorBoundary>
  );
}

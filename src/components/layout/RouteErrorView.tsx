"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/Link";
import { Container } from "@/components/ui/Container";
import { ErrorState } from "@/components/ui/ErrorState";
import { reportError } from "@/lib/report-error";

export interface RouteErrorProps {
  error: unknown;
  retry: () => void;
}

/** Shared body for error.tsx boundaries (the boundary decides whether it needs a <main>). */
export function RouteErrorView({ error, retry }: RouteErrorProps) {
  useEffect(() => reportError(error), [error]);
  return (
    <Container size="prose" className="py-20">
      <ErrorState
        headingLevel="h1"
        actions={
          <>
            <Button onClick={() => retry()}>Try again</Button>
            <ButtonLink href="/" variant="outline">
              Go home
            </ButtonLink>
          </>
        }
      />
    </Container>
  );
}

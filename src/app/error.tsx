"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/Link";
import { Container } from "@/components/ui/Container";
import { ErrorState } from "@/components/ui/ErrorState";
import { reportError } from "@/lib/report-error";

export default function RouteError({ error, retry }: { error: unknown; retry: () => void }) {
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

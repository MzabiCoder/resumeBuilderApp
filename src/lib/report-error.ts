/**
 * Single error-reporting seam. Phase 8 wires Sentry here; until then, log to console.
 * Never pass user content (PII) — only the error object.
 */
export function reportError(error: unknown): void {
  const digest =
    typeof error === "object" && error !== null && "digest" in error
      ? String(error.digest)
      : undefined;
  console.error("[app-error]", digest ?? "", error instanceof Error ? error.message : error);
}

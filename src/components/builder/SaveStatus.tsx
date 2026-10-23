"use client";

import { Check, CloudOff, LoaderCircle } from "lucide-react";
import { useResumeStore } from "@/lib/resume/store";

/** Polite live region so screen-reader users hear save failures, not every keystroke. */
export function SaveStatus() {
  const status = useResumeStore((s) => s.saveStatus);
  const hydrated = useResumeStore((s) => s.hydrated);
  return (
    <p role="status" className="flex min-h-11 items-center gap-2 text-sm text-ink-muted">
      {!hydrated || status === "idle" ? (
        <span>Saves automatically on this device</span>
      ) : status === "saving" ? (
        <>
          <LoaderCircle aria-hidden="true" className="size-4 motion-safe:animate-spin" />
          <span>Saving…</span>
        </>
      ) : status === "saved" ? (
        <>
          <Check aria-hidden="true" className="size-4 text-success" />
          <span>Saved on this device</span>
        </>
      ) : (
        <>
          <CloudOff aria-hidden="true" className="size-4 text-danger" />
          <span className="font-medium text-danger">
            Couldn’t save — browser storage is full or blocked
          </span>
        </>
      )}
    </p>
  );
}

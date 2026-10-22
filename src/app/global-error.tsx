"use client";

import { useEffect } from "react";
import { reportError } from "@/lib/report-error";

/** Last-resort boundary: replaces the root layout, so it must be self-contained (no global CSS). */
export default function GlobalError({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => reportError(error), [error]);
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: "system-ui, sans-serif",
          background: "#faf8f4",
          color: "#141726",
          margin: 0,
        }}
      >
        <title>Something went wrong</title>
        <main style={{ maxWidth: "36rem", margin: "0 auto", padding: "6rem 1.5rem" }}>
          <h1 style={{ fontSize: "2rem", lineHeight: 1.2 }}>Something went wrong</h1>
          <p style={{ fontSize: "1.125rem", lineHeight: 1.6 }}>
            We hit an unexpected error. Anything saved on this device is still there.
          </p>
          <button
            type="button"
            onClick={() => retry()}
            style={{
              minHeight: 44,
              padding: "0 1.25rem",
              borderRadius: 999,
              border: 0,
              background: "#2f3bc9",
              color: "#fff",
              fontWeight: 600,
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}

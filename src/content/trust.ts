import type { TrustEntry } from "./schema";

/**
 * PLACEHOLDER — not real figures. `TrustBar` renders nothing until entries are
 * replaced with verified numbers (with a source) and set `verified: true`.
 * Employer names render as plain text only — never logos.
 */
export const trustEntries: TrustEntry[] = [
  { id: "placeholder-users", kind: "stat", value: "PLACEHOLDER", label: "resumes created", source: "PLACEHOLDER — analytics export", verified: false },
  { id: "placeholder-employer", kind: "employer", value: "PLACEHOLDER", label: "Employer where users were hired", source: "PLACEHOLDER — consented user survey", verified: false },
];

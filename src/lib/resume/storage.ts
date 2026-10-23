import { migrateResume, type ResumeDocument } from "./schema";

/**
 * localStorage persistence for the signed-out draft. Never throws: storage can be
 * unavailable (Safari private mode, quota, disabled cookies) and the builder must
 * keep working in-memory.
 */
export const DRAFT_KEY = "hireready:resume:draft";
export const CORRUPT_BACKUP_KEY = "hireready:resume:draft:corrupt";

function storage(): Storage | null {
  try {
    return typeof window === "undefined" ? null : window.localStorage;
  } catch {
    return null;
  }
}

export type LoadResult =
  | { status: "empty" }
  | { status: "loaded"; doc: ResumeDocument }
  /** Unreadable data was moved to CORRUPT_BACKUP_KEY so nothing is silently lost. */
  | { status: "recovered" }
  | { status: "unavailable" };

export function loadDraft(): LoadResult {
  const s = storage();
  if (!s) return { status: "unavailable" };
  let raw: string | null;
  try {
    raw = s.getItem(DRAFT_KEY);
  } catch {
    return { status: "unavailable" };
  }
  if (raw === null) return { status: "empty" };
  try {
    const doc = migrateResume(JSON.parse(raw));
    if (doc) return { status: "loaded", doc };
  } catch {
    // fall through to recovery
  }
  try {
    s.setItem(CORRUPT_BACKUP_KEY, raw);
    s.removeItem(DRAFT_KEY);
  } catch {
    // ignore
  }
  return { status: "recovered" };
}

export function saveDraft(doc: ResumeDocument): boolean {
  const s = storage();
  if (!s) return false;
  try {
    s.setItem(DRAFT_KEY, JSON.stringify(doc));
    return true;
  } catch {
    return false;
  }
}

export function clearDraft(): void {
  try {
    storage()?.removeItem(DRAFT_KEY);
  } catch {
    // ignore
  }
}

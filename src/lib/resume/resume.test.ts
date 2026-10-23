import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  createEmptyResume,
  emailError,
  formatMonth,
  formatRange,
  migrateResume,
  resumeSchema,
} from "./schema";
import { CORRUPT_BACKUP_KEY, DRAFT_KEY, loadDraft, saveDraft } from "./storage";
import { AUTOSAVE_DELAY_MS, createResumeStore, flushOnPageHide, syncAcrossTabs } from "./store";

beforeEach(() => localStorage.clear());

describe("schema", () => {
  it("creates a valid empty resume", () => {
    expect(resumeSchema.safeParse(createEmptyResume()).success).toBe(true);
  });

  it("migrates v0 drafts (no version, single name) to v1", () => {
    const doc = migrateResume({ name: "Ada  Lovelace King", summary: "Hi" });
    expect(doc?.version).toBe(1);
    expect(doc?.contact.firstName).toBe("Ada");
    expect(doc?.contact.lastName).toBe("Lovelace King");
    expect(doc?.summary).toBe("Hi");
  });

  it("rejects unsalvageable input", () => {
    expect(migrateResume(null)).toBeNull();
    expect(migrateResume({ version: 1, experience: "nope" })).toBeNull();
  });

  it("stores partial emails (validated in UI only)", () => {
    const doc = {
      ...createEmptyResume(),
      contact: { ...createEmptyResume().contact, email: "ada@" },
    };
    expect(resumeSchema.safeParse(doc).success).toBe(true);
    expect(emailError("ada@")).toMatch(/name@example.com/);
    expect(emailError("")).toBeUndefined();
    expect(emailError(" ada@example.com ")).toBeUndefined();
  });

  it("formats month/year ranges", () => {
    expect(formatMonth("2021-03")).toBe("Mar 2021");
    expect(formatMonth("2021")).toBe("2021");
    expect(formatMonth("")).toBe("");
    expect(formatRange("2020-01", "2021-06")).toBe("Jan 2020 – Jun 2021");
    expect(formatRange("2020-01", "", true)).toBe("Jan 2020 – Present");
    expect(formatRange("", "2019")).toBe("2019");
  });
});

describe("storage", () => {
  it("round-trips a draft", () => {
    const doc = createEmptyResume("ledger");
    expect(saveDraft(doc)).toBe(true);
    expect(loadDraft()).toEqual({ status: "loaded", doc });
  });

  it("backs up unreadable drafts instead of discarding them", () => {
    localStorage.setItem(DRAFT_KEY, "{not json");
    expect(loadDraft()).toEqual({ status: "recovered" });
    expect(localStorage.getItem(CORRUPT_BACKUP_KEY)).toBe("{not json");
    expect(localStorage.getItem(DRAFT_KEY)).toBeNull();
  });

  it("reports failure when storage throws (quota / private mode)", () => {
    const spy = vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new DOMException("full", "QuotaExceededError");
    });
    expect(saveDraft(createEmptyResume())).toBe(false);
    spy.mockRestore();
  });
});

describe("store", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("hydrates, applies the URL template and debounces autosave", () => {
    const store = createResumeStore();
    store.getState().hydrate("baseline");
    expect(store.getState().doc.templateId).toBe("baseline");
    store.getState().updateContact({ firstName: "A" });
    store.getState().updateContact({ firstName: "Ad" });
    expect(store.getState().saveStatus).toBe("saving");
    expect(localStorage.getItem(DRAFT_KEY)).toBeNull();
    vi.advanceTimersByTime(AUTOSAVE_DELAY_MS);
    expect(store.getState().saveStatus).toBe("saved");
    const saved = loadDraft();
    expect(saved.status === "loaded" && saved.doc.contact.firstName).toBe("Ad");
  });

  it("flushes a pending save on pagehide", () => {
    const store = createResumeStore();
    store.getState().hydrate();
    const stop = flushOnPageHide(store);
    store.getState().setSummary("last words");
    window.dispatchEvent(new Event("pagehide"));
    const saved = loadDraft();
    expect(saved.status === "loaded" && saved.doc.summary).toBe("last words");
    expect(store.getState().saveStatus).toBe("saved");
    stop();
  });

  it("adds, updates, moves and removes list items", () => {
    const store = createResumeStore();
    store.getState().hydrate();
    const a = store.getState().addItem("experience");
    const b = store.getState().addItem("experience");
    store.getState().updateItem("experience", b, { role: "Lead" });
    store.getState().moveItem("experience", b, -1);
    expect(store.getState().doc.experience.map((e) => e.id)).toEqual([b, a]);
    store.getState().moveItem("experience", b, -1); // out of range: no-op
    expect(store.getState().doc.experience[0]?.role).toBe("Lead");
    const removed = store.getState().removeItem("experience", b);
    expect(removed?.index).toBe(0);
    expect(store.getState().doc.experience.map((e) => e.id)).toEqual([a]);
    store.getState().insertItem("experience", removed!.item, removed!.index);
    expect(store.getState().doc.experience.map((e) => e.id)).toEqual([b, a]);
    expect(store.getState().removeItem("experience", "missing")).toBeNull();
  });

  it("reset keeps the chosen template", () => {
    const store = createResumeStore();
    store.getState().hydrate("ledger");
    store.getState().setSummary("x");
    store.getState().reset();
    expect(store.getState().doc.summary).toBe("");
    expect(store.getState().doc.templateId).toBe("ledger");
  });

  it("syncs newer drafts from other tabs only", () => {
    const store = createResumeStore();
    store.getState().hydrate();
    const stop = syncAcrossTabs(store);
    const newer = {
      ...createEmptyResume(),
      summary: "from tab 2",
      updatedAt: "2999-01-01T00:00:00.000Z",
    };
    window.dispatchEvent(
      new StorageEvent("storage", { key: DRAFT_KEY, newValue: JSON.stringify(newer) }),
    );
    expect(store.getState().doc.summary).toBe("from tab 2");
    const older = { ...newer, summary: "stale", updatedAt: "2000-01-01T00:00:00.000Z" };
    window.dispatchEvent(
      new StorageEvent("storage", { key: DRAFT_KEY, newValue: JSON.stringify(older) }),
    );
    expect(store.getState().doc.summary).toBe("from tab 2");
    stop();
  });
});

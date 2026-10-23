"use client";

import { create } from "zustand";
import {
  createEmptyResume,
  emptyEducation,
  emptyExperience,
  emptySkill,
  migrateResume,
  type Contact,
  type Education,
  type Experience,
  type ResumeDocument,
  type Skill,
} from "./schema";
import { DRAFT_KEY, loadDraft, saveDraft } from "./storage";

export type SaveStatus = "idle" | "saving" | "saved" | "error";
type ListKey = "experience" | "education" | "skills";
type ListItem<K extends ListKey> = ResumeDocument[K][number];

export interface ResumeState {
  doc: ResumeDocument;
  /** False until the persisted draft has been read on the client. */
  hydrated: boolean;
  saveStatus: SaveStatus;
  /** Set when an unreadable draft was backed up and a fresh one started. */
  recovered: boolean;
  hydrate: (templateFromUrl?: string | null) => void;
  updateContact: (patch: Partial<Contact>) => void;
  setSummary: (summary: string) => void;
  setTemplate: (templateId: string) => void;
  addItem: <K extends ListKey>(key: K) => string;
  updateItem: <K extends ListKey>(key: K, id: string, patch: Partial<ListItem<K>>) => void;
  /** Returns what was removed (and where) so the UI can offer Undo. */
  removeItem: <K extends ListKey>(
    key: K,
    id: string,
  ) => { item: ListItem<K>; index: number } | null;
  /** Re-insert an item at `index` (clamped), e.g. Undo after remove. */
  insertItem: <K extends ListKey>(key: K, item: ListItem<K>, index: number) => void;
  moveItem: (key: ListKey, id: string, delta: -1 | 1) => void;
  /** Replace the whole document (e.g. from another tab). Not re-saved. */
  replace: (doc: ResumeDocument) => void;
  reset: () => void;
  /** Write any pending debounced save immediately (pagehide / tab hidden). */
  flush: () => void;
}

const factories: { [K in ListKey]: () => ListItem<K> } = {
  experience: emptyExperience as () => Experience,
  education: emptyEducation as () => Education,
  skills: emptySkill as () => Skill,
};

export const AUTOSAVE_DELAY_MS = 600;

export const createResumeStore = () =>
  create<ResumeState>((set, get) => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    let pending = false;

    const scheduleSave = () => {
      clearTimeout(timer);
      pending = true;
      set({ saveStatus: "saving" });
      timer = setTimeout(() => get().flush(), AUTOSAVE_DELAY_MS);
    };

    const edit = (fn: (doc: ResumeDocument) => ResumeDocument) => {
      set((s) => ({ doc: { ...fn(s.doc), updatedAt: new Date().toISOString() } }));
      scheduleSave();
    };

    return {
      doc: createEmptyResume(),
      hydrated: false,
      saveStatus: "idle",
      recovered: false,
      hydrate: (templateFromUrl) => {
        if (get().hydrated) return;
        const result = loadDraft();
        const doc = result.status === "loaded" ? result.doc : createEmptyResume();
        set({ doc, hydrated: true, recovered: result.status === "recovered" });
        if (templateFromUrl && templateFromUrl !== doc.templateId)
          get().setTemplate(templateFromUrl);
      },
      updateContact: (patch) => edit((d) => ({ ...d, contact: { ...d.contact, ...patch } })),
      setSummary: (summary) => edit((d) => ({ ...d, summary })),
      setTemplate: (templateId) => edit((d) => ({ ...d, templateId })),
      addItem: (key) => {
        const item = factories[key]();
        edit((d) => ({ ...d, [key]: [...d[key], item] }));
        return item.id;
      },
      updateItem: (key, id, patch) =>
        edit((d) => ({
          ...d,
          [key]: (d[key] as ListItem<typeof key>[]).map((it) =>
            it.id === id ? { ...it, ...patch } : it,
          ),
        })),
      removeItem: (key, id) => {
        const list = get().doc[key] as ListItem<typeof key>[];
        const index = list.findIndex((it) => it.id === id);
        const item = list[index];
        if (!item) return null;
        edit((d) => ({
          ...d,
          [key]: (d[key] as ListItem<typeof key>[]).filter((it) => it.id !== id),
        }));
        return { item, index };
      },
      insertItem: (key, item, index) =>
        edit((d) => {
          const list = (d[key] as ListItem<typeof key>[]).filter((it) => it.id !== item.id);
          list.splice(Math.max(0, Math.min(index, list.length)), 0, item);
          return { ...d, [key]: list };
        }),
      moveItem: (key, id, delta) =>
        edit((d) => {
          const list = [...(d[key] as ListItem<typeof key>[])];
          const from = list.findIndex((it) => it.id === id);
          const to = from + delta;
          if (from < 0 || to < 0 || to >= list.length) return d;
          const [item] = list.splice(from, 1);
          if (item) list.splice(to, 0, item);
          return { ...d, [key]: list };
        }),
      replace: (doc) => set({ doc }),
      reset: () => edit(() => createEmptyResume(get().doc.templateId)),
      flush: () => {
        clearTimeout(timer);
        if (!pending) return;
        pending = false;
        set({ saveStatus: saveDraft(get().doc) ? "saved" : "error" });
      },
    };
  });

export const useResumeStore = createResumeStore();

/** Never lose the last keystrokes: flush the debounced save when the page goes away. */
export function flushOnPageHide(store = useResumeStore): () => void {
  const flush = () => store.getState().flush();
  const onVisibility = () => {
    if (document.visibilityState === "hidden") flush();
  };
  window.addEventListener("pagehide", flush);
  document.addEventListener("visibilitychange", onVisibility);
  return () => {
    window.removeEventListener("pagehide", flush);
    document.removeEventListener("visibilitychange", onVisibility);
  };
}

/** Keep multiple tabs in sync: the most recent write wins. Returns an unsubscribe. */
export function syncAcrossTabs(store = useResumeStore): () => void {
  const onStorage = (e: StorageEvent) => {
    if (e.key !== DRAFT_KEY || e.newValue === null) return;
    try {
      const doc = migrateResume(JSON.parse(e.newValue));
      if (doc && doc.updatedAt > store.getState().doc.updatedAt) store.getState().replace(doc);
    } catch {
      // ignore malformed writes from other tabs
    }
  };
  window.addEventListener("storage", onStorage);
  return () => window.removeEventListener("storage", onStorage);
}

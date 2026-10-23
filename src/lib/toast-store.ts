import { create } from "zustand";

export type ToastTone = "info" | "success" | "error";

export interface ToastItem {
  id: string;
  title: string;
  description?: string;
  tone: ToastTone;
  action?: ToastAction;
}

export interface ToastAction {
  label: string;
  /** Required by Radix: how to do the same thing without the toast (screen-reader hint). */
  altText: string;
  onClick: () => void;
}

interface ToastState {
  toasts: ToastItem[];
  push: (toast: Omit<ToastItem, "id">) => string;
  dismiss: (id: string) => void;
}

let counter = 0;

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  push: (toast) => {
    const id = `t${++counter}`;
    set((s) => ({ toasts: [...s.toasts.slice(-2), { ...toast, id }] }));
    return id;
  },
  dismiss: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));

/** Imperative helper usable from any client code. */
const make =
  (tone: ToastTone) => (title: string, description?: string, options?: { action?: ToastAction }) =>
    useToastStore.getState().push({ title, description, tone, action: options?.action });

export const toast = { info: make("info"), success: make("success"), error: make("error") };

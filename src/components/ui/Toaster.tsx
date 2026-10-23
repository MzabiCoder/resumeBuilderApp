"use client";

import { Toast as T } from "radix-ui";
import { CheckCircle2, Info, AlertTriangle, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { useToastStore, type ToastTone } from "@/lib/toast-store";

const icons = { info: Info, success: CheckCircle2, error: AlertTriangle } satisfies Record<
  ToastTone,
  unknown
>;
const tones = {
  info: "border-border",
  success: "border-success",
  error: "border-danger",
} as const;

export interface ToasterProps {
  closeLabel?: string;
}

/**
 * Renders queued toasts. Info/success announce politely ("background");
 * errors announce assertively ("foreground") and stay until dismissed.
 */
export function Toaster({ closeLabel = "Dismiss notification" }: ToasterProps) {
  const { toasts, dismiss } = useToastStore();
  return (
    <T.Provider swipeDirection="right" duration={6000}>
      {toasts.map((t) => {
        const Icon = icons[t.tone];
        return (
          <T.Root
            key={t.id}
            type={t.tone === "error" ? "foreground" : "background"}
            // Errors persist; toasts with an action get longer (Radix also pauses on hover/focus, F8 focuses).
            duration={t.tone === "error" ? Infinity : t.action ? 10000 : undefined}
            onOpenChange={(open) => !open && dismiss(t.id)}
            className={cn(
              "flex items-start gap-3 rounded-lg border-l-4 bg-surface-raised p-4 text-ink shadow-lg",
              tones[t.tone],
            )}
          >
            <Icon aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
            <div className="flex-1">
              <T.Title className="font-semibold">{t.title}</T.Title>
              {t.description ? (
                <T.Description className="text-sm text-ink-muted">{t.description}</T.Description>
              ) : null}
            </div>
            {t.action ? (
              <T.Action
                altText={t.action.altText}
                onClick={t.action.onClick}
                className="-my-1 inline-flex min-h-10 items-center rounded-full px-3 text-sm font-semibold text-primary underline-offset-4 hover:underline"
              >
                {t.action.label}
              </T.Action>
            ) : null}
            <T.Close
              aria-label={closeLabel}
              className="-m-2 grid size-10 place-items-center rounded-full hover:bg-surface-sunken"
            >
              <X aria-hidden="true" className="size-4" />
            </T.Close>
          </T.Root>
        );
      })}
      <T.Viewport className="fixed right-0 bottom-0 z-[90] flex w-full max-w-sm flex-col gap-2 p-4 outline-none" />
    </T.Provider>
  );
}

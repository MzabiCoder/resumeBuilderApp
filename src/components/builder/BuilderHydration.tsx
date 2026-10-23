"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { templates } from "@/content/templates";
import { isBuiltTemplate } from "@/components/resume-templates/registry";
import { flushOnPageHide, syncAcrossTabs, useResumeStore } from "@/lib/resume/store";
import { toast } from "@/lib/toast-store";

/**
 * Reads the persisted draft once on the client, applies `?template=` from the URL
 * and keeps tabs in sync. Renders nothing; must sit inside <Suspense> because of
 * useSearchParams (static prerender).
 */
export function BuilderHydration() {
  const params = useSearchParams();
  const requested = params.get("template");

  useEffect(() => {
    const store = useResumeStore.getState();
    if (store.hydrated) return;
    const usable = requested && isBuiltTemplate(requested) ? requested : null;
    store.hydrate(usable);
    if (useResumeStore.getState().recovered) {
      toast.error(
        "We couldn’t read your saved draft",
        "A backup was kept on this device and a fresh resume was started.",
      );
    }
    if (requested && !usable) {
      const name = templates.find((t) => t.id === requested)?.name;
      if (name) toast.info(`${name} is coming soon`, "We’ve started you on Clarity for now.");
    }
  }, [requested]);

  useEffect(() => {
    const stopSync = syncAcrossTabs();
    const stopFlush = flushOnPageHide();
    return () => {
      stopSync();
      stopFlush();
    };
  }, []);
  return null;
}

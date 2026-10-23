"use client";

import { Download, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import { templates } from "@/content/templates";
import { builtTemplateIds } from "@/components/resume-templates/registry";
import { useResumeStore } from "@/lib/resume/store";
import { toast } from "@/lib/toast-store";
import { cn } from "@/lib/cn";
import { printResume } from "./print";

export const builtTemplates = templates.filter((t) => builtTemplateIds.includes(t.id));

export function TemplateChoice() {
  const templateId = useResumeStore((s) => s.doc.templateId);
  const setTemplate = useResumeStore((s) => s.setTemplate);
  return (
    <fieldset className="min-w-0">
      <legend className="mb-3 text-lg font-semibold">Template</legend>
      <div className="grid gap-3 sm:grid-cols-3">
        {builtTemplates.map((t) => (
          <label
            key={t.id}
            className={cn(
              "flex cursor-pointer flex-col gap-1 rounded-xl border-2 bg-surface-raised p-4",
              "has-focus-visible:ring-3 has-focus-visible:ring-focus",
              t.id === templateId ? "border-primary" : "border-border hover:border-ink-muted",
            )}
          >
            <span className="flex items-center gap-2 font-semibold">
              <input
                type="radio"
                name="template"
                value={t.id}
                checked={t.id === templateId}
                onChange={() => setTemplate(t.id)}
                className="size-4 accent-(--color-primary)"
              />
              {t.name}
            </span>
            <span className="text-sm text-ink-muted">{t.description}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function FinalizeStep() {
  const reset = useResumeStore((s) => s.reset);
  return (
    <div className="flex flex-col gap-8">
      <TemplateChoice />
      <section aria-labelledby="download-heading" className="flex flex-col gap-3">
        <h2 id="download-heading" className="text-lg font-semibold">
          Download
        </h2>
        <p className="text-ink-muted">
          Your browser’s print window opens. Choose <strong>Save as PDF</strong> as the destination.
          The PDF has real, selectable text that applicant tracking systems can read.
        </p>
        <Button type="button" size="lg" className="self-start" onClick={printResume}>
          <Download aria-hidden="true" />
          Download PDF
        </Button>
      </section>
      <section aria-labelledby="start-over-heading" className="flex flex-col gap-3">
        <h2 id="start-over-heading" className="text-lg font-semibold">
          Start over
        </h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button type="button" variant="outline" className="self-start">
              <RotateCcw aria-hidden="true" />
              Clear this resume
            </Button>
          </DialogTrigger>
          <DialogContent
            title="Clear this resume?"
            description="Everything you’ve entered will be removed from this device. This can’t be undone."
          >
            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <DialogClose asChild>
                <Button type="button" variant="ghost">
                  Keep my resume
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="danger"
                  onClick={() => {
                    reset();
                    toast.success("Resume cleared");
                  }}
                >
                  Clear resume
                </Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </section>
    </div>
  );
}

"use client";

import { useMemo, type ReactNode } from "react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Eye } from "lucide-react";
import { Stepper } from "@/components/ui/Stepper";
import { Button } from "@/components/ui/Button";
import { buttonVariants } from "@/components/ui/button-variants";
import { Select } from "@/components/ui/Select";
import { Skeleton } from "@/components/ui/Skeleton";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import { useResumeStore } from "@/lib/resume/store";
import { cn } from "@/lib/cn";
import { builderStepHref, builderSteps, isStepComplete, type BuilderStepId } from "./steps";
import { ContactForm, EducationForm, ExperienceForm, SkillsForm, SummaryForm } from "./forms";
import { builtTemplates, FinalizeStep } from "./FinalizeStep";
import { LivePreview } from "./LivePreview";

const forms: Record<BuilderStepId, () => ReactNode> = {
  contact: ContactForm,
  experience: ExperienceForm,
  education: EducationForm,
  skills: SkillsForm,
  summary: SummaryForm,
  finalize: FinalizeStep,
};

function PreviewTemplateSelect() {
  const templateId = useResumeStore((s) => s.doc.templateId);
  const setTemplate = useResumeStore((s) => s.setTemplate);
  return (
    <div className="flex items-center gap-3">
      <label htmlFor="preview-template" className="text-sm font-semibold">
        Template
      </label>
      <Select
        id="preview-template"
        className="w-auto"
        options={builtTemplates.map((t) => ({ value: t.id, label: t.name }))}
        value={templateId}
        onChange={(e) => setTemplate(e.target.value)}
      />
    </div>
  );
}

/**
 * Two-pane builder: form on the left, live preview on the right (lg+). On smaller
 * screens the preview opens in a sheet. The step heading is server-rendered and
 * passed in so the h1 is in the initial HTML.
 */
export function BuilderWorkspace({
  stepId,
  heading,
}: {
  stepId: BuilderStepId;
  heading: ReactNode;
}) {
  const router = useRouter();
  const doc = useResumeStore((s) => s.doc);
  const hydrated = useResumeStore((s) => s.hydrated);
  const index = builderSteps.findIndex((s) => s.id === stepId);
  const prev = builderSteps[index - 1];
  const next = builderSteps[index + 1];
  const completed = useMemo(
    () => new Set(builderSteps.filter((s) => isStepComplete(s.id, doc)).map((s) => s.id)),
    [doc],
  );
  const Form = forms[stepId];

  return (
    <div className="mx-auto grid w-full max-w-[90rem] gap-8 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,34rem)] lg:gap-12 lg:px-10 xl:grid-cols-[minmax(0,1fr)_minmax(0,40rem)]">
      <div className="flex min-w-0 flex-col gap-6">
        <Stepper
          steps={builderSteps}
          currentIndex={index}
          completed={completed}
          onStepSelect={(i) => {
            const target = builderSteps[i];
            if (target) router.push(builderStepHref(target.id));
          }}
          label="Resume sections"
        />
        {heading}
        <div className="flex justify-end lg:hidden">
          <Dialog>
            <DialogTrigger asChild>
              <Button type="button" variant="outline" size="sm">
                <Eye aria-hidden="true" />
                Preview resume
              </Button>
            </DialogTrigger>
            <DialogContent title="Resume preview" layout="sheet">
              <div className="mt-4 flex flex-col gap-4">
                <PreviewTemplateSelect />
                {hydrated ? <LivePreview idPrefix="sheet-preview" /> : null}
              </div>
            </DialogContent>
          </Dialog>
        </div>
        {/* Render the real (empty) form immediately rather than a skeleton: the layout is
            identical before and after the draft loads → no layout shift. Busy until hydrated. */}
        <div aria-busy={!hydrated}>
          <Form />
        </div>
        <nav
          aria-label="Step navigation"
          className="flex flex-wrap justify-between gap-3 border-t border-border pt-6"
        >
          {prev ? (
            <NextLink
              href={builderStepHref(prev.id)}
              className={buttonVariants({ variant: "ghost" })}
            >
              <ArrowLeft aria-hidden="true" />
              Back<span className="sr-only">: {prev.label}</span>
            </NextLink>
          ) : (
            <span />
          )}
          {next ? (
            <NextLink href={builderStepHref(next.id)} className={buttonVariants()}>
              Next: {next.label}
              <ArrowRight aria-hidden="true" />
            </NextLink>
          ) : null}
        </nav>
      </div>
      <aside aria-label="Live preview" className="hidden lg:block">
        <div className="sticky top-24 flex flex-col gap-4">
          <PreviewTemplateSelect />
          {hydrated ? (
            <LivePreview idPrefix="preview" />
          ) : (
            <Skeleton className={cn("aspect-[8.5/11] w-full")} />
          )}
        </div>
      </aside>
    </div>
  );
}

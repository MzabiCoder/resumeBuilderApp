import type { ComponentType } from "react";
import { Baseline, Clarity, Ledger, type ResumeTemplateProps } from "./templates";

/** Template components that exist today. Gallery entries not listed here fall back to Clarity. */
export const resumeTemplateComponents: Readonly<
  Record<string, ComponentType<ResumeTemplateProps>>
> = { clarity: Clarity, ledger: Ledger, baseline: Baseline };

export const builtTemplateIds = Object.keys(resumeTemplateComponents);

export function isBuiltTemplate(id: string): boolean {
  return Object.hasOwn(resumeTemplateComponents, id);
}

export function getTemplateComponent(id: string): ComponentType<ResumeTemplateProps> {
  return resumeTemplateComponents[id] ?? Clarity;
}

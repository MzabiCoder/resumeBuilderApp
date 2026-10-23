import { createElement } from "react";
import { getTemplateComponent } from "./registry";
import type { ResumeTemplateProps } from "./templates";

/** Render a template by id (registry entries are static module-level components). */
export function ResumeTemplate({
  templateId,
  ...props
}: ResumeTemplateProps & { templateId: string }) {
  return createElement(getTemplateComponent(templateId), props);
}

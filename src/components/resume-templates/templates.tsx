import type { ResumeDocument } from "@/lib/resume/schema";
import { ResumeLayout, type TemplateTheme } from "./ResumeLayout";

export interface ResumeTemplateProps {
  doc: ResumeDocument;
  className?: string;
  idPrefix?: string;
}

const serif = "font-[family-name:var(--font-fraunces),ui-serif,Georgia,serif]";
const sans = "font-[family-name:var(--font-inter),ui-sans-serif,system-ui,sans-serif]";

/** Modern: sans, accent headings, generous spacing. */
export const clarityTheme: TemplateTheme = {
  id: "clarity",
  root: `${sans} px-16 py-14 text-[13.5px] leading-[1.5]`,
  header: "border-b-2 border-(--accent) pb-5",
  name: `${sans} text-[30px] leading-tight font-bold tracking-tight`,
  title: "mt-1 text-[15px] font-semibold text-(--accent)",
  contact: "mt-2 text-[12.5px] text-(--ink-muted)",
  section: "mt-6",
  heading: `${sans} mb-2 text-[12px] font-bold tracking-[0.14em] text-(--accent) uppercase`,
  entryTitle: `${sans} text-[14px] font-semibold`,
  meta: "text-[12.5px] text-(--ink-muted)",
  body: "",
  bullets: "mt-1.5 space-y-1 marker:text-(--accent)",
  skills: "inline",
};

/** Traditional: serif name and headings, centred header, hairline rules. */
export const ledgerTheme: TemplateTheme = {
  id: "ledger",
  root: `${sans} px-16 py-14 text-[13.5px] leading-[1.5]`,
  header: "border-b border-[#c9c4b8] pb-5 text-center",
  name: `${serif} text-[32px] leading-tight font-semibold`,
  title: `${serif} mt-1 text-[15px] italic`,
  contact: "mt-2 text-[12.5px] text-(--ink-muted)",
  section: "mt-6",
  heading: `${serif} mb-2 border-b border-[#c9c4b8] pb-1 text-[16px] font-semibold`,
  entryTitle: `${serif} text-[14.5px] font-semibold`,
  meta: "text-[12.5px] text-(--ink-muted) italic",
  body: "",
  bullets: "mt-1.5 space-y-1",
  skills: "columns",
  sectionTitles: { summary: "Profile" },
};

/** Compact: dense, small-caps headings, fits a lot on one page. */
export const baselineTheme: TemplateTheme = {
  id: "baseline",
  root: `${sans} px-12 py-10 text-[12px] leading-[1.4]`,
  header: "pb-2",
  name: `${sans} text-[22px] leading-tight font-bold`,
  title: "text-[13px] font-medium text-(--accent)",
  contact: "mt-1 text-[11.5px] text-(--ink-muted)",
  section: "mt-3.5",
  heading: `${sans} mb-1.5 border-b border-(--accent) text-[12.5px] font-bold tracking-wide text-(--accent) [font-variant-caps:all-small-caps]`,
  entryTitle: `${sans} text-[12.5px] font-semibold`,
  meta: "text-[11.5px] text-(--ink-muted)",
  body: "",
  bullets: "mt-0.5 space-y-0.5",
  skills: "inline",
};

export function Clarity(props: ResumeTemplateProps) {
  return <ResumeLayout theme={clarityTheme} {...props} />;
}
export function Ledger(props: ResumeTemplateProps) {
  return <ResumeLayout theme={ledgerTheme} {...props} />;
}
export function Baseline(props: ResumeTemplateProps) {
  return <ResumeLayout theme={baselineTheme} {...props} />;
}

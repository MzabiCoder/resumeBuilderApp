"use client";

import { useEffect, useState } from "react";
import { createPortal, flushSync } from "react-dom";
import { ResumeTemplate } from "@/components/resume-templates/ResumeTemplate";
import { useResumeStore } from "@/lib/resume/store";
import { fullName } from "@/lib/resume/schema";

/**
 * PDF export via the browser's print pipeline ("Save as PDF"): real, selectable,
 * ATS-readable text and zero extra JS. On `beforeprint` (button or Ctrl/Cmd+P) an
 * unscaled copy is rendered synchronously into <body>; print CSS in globals.css
 * hides everything else (`body > :not(#resume-print-root)`).
 */
export const PRINT_ROOT_ID = "resume-print-root";

export function PrintRoot() {
  const [printing, setPrinting] = useState(false);
  const doc = useResumeStore((s) => s.doc);

  useEffect(() => {
    let previousTitle = "";
    const before = () => {
      previousTitle = document.title;
      const name = fullName(useResumeStore.getState().doc.contact);
      // Browsers use the document title as the default PDF file name.
      document.title = name ? `${name} – Resume` : "Resume";
      flushSync(() => setPrinting(true));
    };
    const after = () => {
      document.title = previousTitle || document.title;
      setPrinting(false);
    };
    window.addEventListener("beforeprint", before);
    window.addEventListener("afterprint", after);
    return () => {
      window.removeEventListener("beforeprint", before);
      window.removeEventListener("afterprint", after);
    };
  }, []);

  if (!printing) return null;
  return createPortal(
    <div id={PRINT_ROOT_ID}>
      <ResumeTemplate templateId={doc.templateId} doc={doc} idPrefix="print" />
    </div>,
    document.body,
  );
}

export function printResume() {
  window.print();
}

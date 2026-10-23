"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { ResumeTemplate } from "@/components/resume-templates/ResumeTemplate";
import { useResumeStore } from "@/lib/resume/store";
import { cn } from "@/lib/cn";

export const PAPER_WIDTH = 816;

/**
 * Renders the real template at print size (816 px = 8.5 in) and scales it to fit.
 * The same component output is used for the PDF, so the preview is exact.
 */
export function LivePreview({ className, idPrefix }: { className?: string; idPrefix: string }) {
  const doc = useResumeStore((s) => s.doc);
  const frameRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);
  const [height, setHeight] = useState(1056);

  useLayoutEffect(() => {
    const frame = frameRef.current;
    const paper = paperRef.current;
    if (!frame || !paper) return;
    const measure = () => {
      setScale(Math.min(1, frame.clientWidth / PAPER_WIDTH));
      setHeight(paper.offsetHeight);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(frame);
    ro.observe(paper);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={frameRef} className={cn("w-full", className)} data-testid="live-preview">
      <div
        className="overflow-hidden rounded-md shadow-lg ring-1 ring-border"
        style={{ height: height * scale }}
      >
        <div
          ref={paperRef}
          className="origin-top-left"
          style={{ transform: `scale(${scale})`, width: PAPER_WIDTH }}
        >
          <ResumeTemplate templateId={doc.templateId} doc={doc} idPrefix={idPrefix} />
        </div>
      </div>
    </div>
  );
}

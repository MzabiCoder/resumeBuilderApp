import type { TemplateMeta } from "@/content/schema";
import { cn } from "@/lib/cn";

export interface TemplateThumbnailProps {
  layout: TemplateMeta["layout"];
  accent: string;
  className?: string;
}

function Lines({ count, widths = ["100%", "92%", "85%"] }: { count: number; widths?: string[] }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className="block h-[3px] rounded-full bg-[#141726]/15" style={{ width: widths[i % widths.length] }} />
      ))}
    </>
  );
}

/**
 * Decorative schematic of a template layout (aria-hidden). Image slot:
 * Phase 3 replaces this with real exported template previews.
 */
export function TemplateThumbnail({ layout, accent, className }: TemplateThumbnailProps) {
  const body = (
    <div className="flex flex-col gap-[6%]">
      {[4, 3, 3].map((n, i) => (
        <div key={i} className="flex flex-col gap-1.5">
          <span className="block h-1.5 w-1/3 rounded-full" style={{ background: accent }} />
          <Lines count={n} />
        </div>
      ))}
    </div>
  );
  return (
    <div aria-hidden="true" className={cn("resume-paper aspect-[8.5/11] w-full overflow-hidden rounded-sm shadow-md", className)}>
      {layout === "band" ? (
        <div className="flex h-full flex-col">
          <div className="flex flex-col gap-1.5 p-[9%]" style={{ background: accent }}>
            <span className="block h-3 w-1/2 rounded-full bg-white/90" />
            <span className="block h-1.5 w-1/3 rounded-full bg-white/60" />
          </div>
          <div className="p-[9%]">{body}</div>
        </div>
      ) : layout === "sidebar" ? (
        <div className="grid h-full grid-cols-[34%_1fr]">
          <div className="flex flex-col gap-2 p-[14%]" style={{ background: `${accent}14` }}>
            <span className="mb-2 block aspect-square w-2/3 rounded-full" style={{ background: `${accent}55` }} />
            <Lines count={6} widths={["90%", "70%", "80%"]} />
          </div>
          <div className="flex flex-col gap-[6%] p-[12%]">
            <span className="block h-3 w-2/3 rounded-full bg-[#141726]/80" />
            {body}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-[6%] p-[10%]">
          <div className="flex flex-col items-start gap-1.5 border-b-2 pb-[6%]" style={{ borderColor: accent }}>
            <span className="block h-3 w-1/2 rounded-full bg-[#141726]/80" />
            <span className="block h-1.5 w-2/3 rounded-full bg-[#141726]/25" />
          </div>
          {body}
        </div>
      )}
    </div>
  );
}

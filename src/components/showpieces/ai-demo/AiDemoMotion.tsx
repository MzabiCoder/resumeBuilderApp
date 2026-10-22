"use client";

import { useShowpiece, type ShowpieceModule } from "@/hooks/useShowpiece";

export interface AiDemoMotionProps {
  targetId?: string;
}

const load = (): Promise<ShowpieceModule> => import("./ai-demo-motion");

/** Behaviour only — renders nothing. See SHOWPIECES.md. */
export function AiDemoMotion({ targetId = "ai-writer" }: AiDemoMotionProps) {
  useShowpiece(targetId, load);
  return null;
}

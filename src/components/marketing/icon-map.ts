import {
  BadgeCheck, Briefcase, Calculator, CreditCard, DraftingCompass, Download, FileText, FileUp, GraduationCap,
  HardHat, HeartHandshake, LayoutTemplate, ListChecks, PenLine, SearchCheck, Settings2, ShieldCheck, Sparkles,
  Sprout, Target, UtensilsCrossed, WandSparkles, type LucideIcon,
} from "lucide-react";
import type { IconKey } from "@/content/schema";

/** Content refers to icons by key; this is the only place keys map to components. */
export const iconMap: Record<IconKey, LucideIcon> = {
  briefcase: Briefcase,
  settings: Settings2,
  compass: DraftingCompass,
  sprout: Sprout,
  "heart-handshake": HeartHandshake,
  "hard-hat": HardHat,
  "graduation-cap": GraduationCap,
  calculator: Calculator,
  utensils: UtensilsCrossed,
  sparkles: Sparkles,
  "file-up": FileUp,
  "layout-template": LayoutTemplate,
  wand: WandSparkles,
  download: Download,
  "credit-card": CreditCard,
  "badge-check": BadgeCheck,
  target: Target,
  "list-checks": ListChecks,
  "pen-line": PenLine,
  "search-check": SearchCheck,
  "shield-check": ShieldCheck,
  "file-text": FileText,
};

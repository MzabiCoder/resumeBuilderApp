import { authLinks } from "@/config/navigation";
import { ButtonLink, Link } from "@/components/ui/Link";
import { cn } from "@/lib/cn";

export interface SignedOutActionsProps {
  layout?: "inline" | "stacked";
}

export function SignedOutActions({ layout = "inline" }: SignedOutActionsProps) {
  const stacked = layout === "stacked";
  return (
    <div className={cn("flex items-center gap-2", stacked && "flex-col items-stretch gap-3")}>
      <Link
        tone="nav"
        href={authLinks.signIn.href}
        className={cn("px-3 py-2 font-semibold text-ink", stacked && "py-3 text-center text-lg")}
      >
        {authLinks.signIn.label}
      </Link>
      <ButtonLink href={authLinks.signUp.href} variant="outline" size={stacked ? "lg" : "md"}>
        {authLinks.signUp.label}
      </ButtonLink>
      <ButtonLink
        href={authLinks.getStarted.href}
        variant="primary"
        size={stacked ? "lg" : "md"}
        prefetch
      >
        {authLinks.getStarted.label}
      </ButtonLink>
    </div>
  );
}

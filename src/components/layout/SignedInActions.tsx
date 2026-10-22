import type { SessionUser } from "@/lib/auth/session";
import { authLinks } from "@/config/navigation";
import { ButtonLink } from "@/components/ui/Link";
import { cn } from "@/lib/cn";
import { UserMenuLazy as UserMenu } from "./UserMenuLazy";

export interface SignedInActionsProps {
  user: SessionUser;
  layout?: "inline" | "stacked";
}

export function SignedInActions({ user, layout = "inline" }: SignedInActionsProps) {
  const stacked = layout === "stacked";
  return (
    <div className={cn("flex items-center gap-2", stacked && "flex-col items-stretch gap-3")}>
      <ButtonLink href={authLinks.documents.href} variant="ghost" size={stacked ? "lg" : "md"}>
        {authLinks.documents.label}
      </ButtonLink>
      <UserMenu
        name={user.name ?? user.email}
        image={user.image}
        links={[authLinks.account, authLinks.privacyCenter]}
        signOut={authLinks.signOut}
      />
    </div>
  );
}

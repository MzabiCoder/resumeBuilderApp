import { getSession } from "@/lib/auth/session";
import { SignedInActions } from "./SignedInActions";
import { SignedOutActions } from "./SignedOutActions";

export interface AccountActionsProps {
  layout?: "inline" | "stacked";
}

/**
 * Request-specific: reads the session. Always render inside <Suspense> with
 * <SignedOutActions> as the fallback so the page shell stays static.
 */
export async function AccountActions({ layout = "inline" }: AccountActionsProps) {
  const session = await getSession();
  return session ? (
    <SignedInActions user={session.user} layout={layout} />
  ) : (
    <SignedOutActions layout={layout} />
  );
}

import { ComingSoon } from "@/components/layout/ComingSoon";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "Sign in",
  description: "Accounts are coming soon to HireReady.",
  path: "/sign-in",
  noindex: true,
});

export default function SignInPage() {
  return (
    <ComingSoon title="Accounts are on the way">
      <p>
        You don’t need an account to use HireReady. Your resume saves automatically on this device.
      </p>
      <p>Soon you’ll be able to sign in to keep several resumes and pick them up on any device.</p>
    </ComingSoon>
  );
}

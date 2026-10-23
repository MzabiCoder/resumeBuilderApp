import { ComingSoon } from "@/components/layout/ComingSoon";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "Sign up",
  description: "Accounts are coming soon to HireReady.",
  path: "/sign-up",
  noindex: true,
});

export default function SignUpPage() {
  return (
    <ComingSoon title="Free accounts are coming soon">
      <p>
        No sign-up needed today: build and download your resume for free, and it saves on this
        device.
      </p>
      <p>Accounts will add syncing across devices and multiple resumes — still free.</p>
    </ComingSoon>
  );
}

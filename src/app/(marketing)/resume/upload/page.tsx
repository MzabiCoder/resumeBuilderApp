import { ComingSoon } from "@/components/layout/ComingSoon";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "Upload your resume",
  description: "Resume upload is coming soon to HireReady.",
  path: "/resume/upload",
  noindex: true,
});

export default function UploadPage() {
  return (
    <ComingSoon title="Resume upload is coming soon">
      <p>
        Soon you’ll be able to upload a PDF or Word resume and we’ll fill in the builder for you.
      </p>
      <p>For now, pick a template and paste your details in — it only takes a few minutes.</p>
    </ComingSoon>
  );
}

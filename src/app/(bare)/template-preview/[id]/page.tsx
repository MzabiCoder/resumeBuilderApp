import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { builtTemplateIds, isBuiltTemplate } from "@/components/resume-templates/registry";
import { ResumeTemplate } from "@/components/resume-templates/ResumeTemplate";
import { sampleResumeDoc } from "@/components/resume-templates/sample-resume";

export const metadata: Metadata = {
  title: "Template preview",
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return builtTemplateIds.map((id) => ({ id }));
}

/** Renders a template with the sample resume at print size. Source for preview images. */
export default async function TemplatePreviewPage({ params }: PageProps<"/template-preview/[id]">) {
  const { id } = await params;
  if (!isBuiltTemplate(id)) notFound();
  return (
    <>
      <h1 className="sr-only">Template preview: {id}</h1>
      <div data-preview-root className="w-[816px]">
        <ResumeTemplate templateId={id} doc={{ ...sampleResumeDoc, templateId: id }} />
      </div>
    </>
  );
}

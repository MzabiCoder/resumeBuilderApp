import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BuilderWorkspace } from "@/components/builder/BuilderWorkspace";
import { builderSteps, isBuilderStepId } from "@/components/builder/steps";

export function generateStaticParams() {
  return builderSteps.map((s) => ({ step: s.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/resume/builder/[step]">): Promise<Metadata> {
  const { step } = await params;
  const meta = builderSteps.find((s) => s.id === step);
  return {
    title: meta ? `${meta.label} · Resume builder` : "Resume builder",
    robots: { index: false, follow: false },
  };
}

export default async function BuilderStepPage({ params }: PageProps<"/resume/builder/[step]">) {
  const { step } = await params;
  if (!isBuilderStepId(step)) notFound();
  const meta = builderSteps.find((s) => s.id === step)!;
  return (
    <BuilderWorkspace
      stepId={step}
      heading={
        <div className="flex flex-col gap-2">
          <h1 className="text-display-sm font-semibold">{meta.title}</h1>
          <p className="text-lead text-ink-muted">{meta.description}</p>
        </div>
      }
    />
  );
}

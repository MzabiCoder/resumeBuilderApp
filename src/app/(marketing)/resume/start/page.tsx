import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { buttonVariants } from "@/components/ui/button-variants";
import { pageMetadata } from "@/lib/seo/metadata";
import { templates } from "@/content/templates";
import { isBuiltTemplate } from "@/components/resume-templates/registry";
import { ResumeTemplate } from "@/components/resume-templates/ResumeTemplate";
import { sampleResumeDoc } from "@/components/resume-templates/sample-resume";
import { builderStepHref } from "@/components/builder/steps";
import { Badge } from "@/components/ui/Badge";
import NextLink from "next/link";

export const metadata = pageMetadata({
  title: "Create your resume — pick a template",
  description:
    "Choose an ATS-friendly template and build your resume step by step. Free, no sign-up needed.",
  path: "/resume/start",
});

const THUMB_SCALE = 0.32;

/** Live-rendered, inert miniature of the real template (exact, no image needed). */
function Miniature({ id }: { id: string }) {
  return (
    <div
      aria-hidden="true"
      inert
      className="overflow-hidden rounded-md ring-1 ring-border"
      style={{ height: 1056 * THUMB_SCALE }}
    >
      <div className="w-[816px] origin-top-left" style={{ transform: `scale(${THUMB_SCALE})` }}>
        <ResumeTemplate
          templateId={id}
          doc={{ ...sampleResumeDoc, templateId: id }}
          idPrefix={`start-${id}`}
        />
      </div>
    </div>
  );
}

export default function StartPage() {
  const ready = templates.filter((t) => isBuiltTemplate(t.id));
  const soon = templates.filter((t) => !isBuiltTemplate(t.id));
  return (
    <Container className="flex flex-col gap-10 py-12 sm:py-16">
      <div className="flex max-w-2xl flex-col gap-3">
        <h1 className="text-display-md font-semibold">Pick a template to start</h1>
        <p className="text-lead text-ink-muted">
          All templates are ATS-friendly and free to download. You can switch at any time — your
          content stays put.
        </p>
      </div>
      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {ready.map((t) => (
          <li
            key={t.id}
            className="flex w-[calc(816px*0.32)] max-w-full flex-col gap-3 justify-self-center"
          >
            <Miniature id={t.id} />
            <h2 className="text-xl font-semibold">{t.name}</h2>
            <p className="text-ink-muted">{t.description}</p>
            <NextLink
              href={`${builderStepHref("contact")}?template=${t.id}`}
              className={buttonVariants({ className: "self-start" })}
            >
              Use {t.name}
              <ArrowRight aria-hidden="true" />
            </NextLink>
          </li>
        ))}
      </ul>
      {soon.length > 0 ? (
        <section aria-labelledby="soon-heading" className="flex flex-col gap-3">
          <h2 id="soon-heading" className="text-xl font-semibold">
            Coming soon
          </h2>
          <ul className="flex flex-wrap gap-2">
            {soon.map((t) => (
              <li key={t.id}>
                <Badge>{t.name}</Badge>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </Container>
  );
}

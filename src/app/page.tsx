import { siteConfig } from "@/config/site";
import { urls } from "@/config/urls";
import { pageMetadata } from "@/lib/seo/metadata";
import {
  aiDemo,
  buildPaths,
  coverLetterPromo,
  finalCta,
  freePromise,
  hero,
  howItWorks,
  sectionTitles,
} from "@/content/home";
import { homeFaq } from "@/content/faq";
import { categories } from "@/content/categories";
import { templateFilters, templates } from "@/content/templates";
import { tips } from "@/content/tips";
import { trustEntries } from "@/content/trust";
import { testimonials } from "@/content/testimonials";
import { Hero } from "@/components/marketing/Hero";
import { FreePromise } from "@/components/marketing/FreePromise";
import { TrustBar } from "@/components/marketing/TrustBar";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { BuildPaths } from "@/components/marketing/BuildPaths";
import { AiWriterDemo } from "@/components/marketing/AiWriterDemo";
import { CategoryGrid } from "@/components/marketing/CategoryGrid";
import { TemplateShowcase } from "@/components/marketing/TemplateShowcase";
import { CoverLetterPromo } from "@/components/marketing/CoverLetterPromo";
import { Testimonials } from "@/components/marketing/Testimonials";
import { TipsGrid } from "@/components/marketing/TipsGrid";
import { FaqSection } from "@/components/marketing/FaqSection";
import { FinalCta } from "@/components/marketing/FinalCta";
import { ShowpieceBoundary } from "@/components/showpieces/ShowpieceBoundary";
import { HeroMotion } from "@/components/showpieces/hero/HeroMotion";
import { AiDemoMotion } from "@/components/showpieces/ai-demo/AiDemoMotion";

export const metadata = pageMetadata({
  title: `Free AI Resume Builder — No Watermark, Free PDF & Word | ${siteConfig.name}`,
  description: siteConfig.description,
  path: "/",
});

/** Landing page: every section is a reusable component; all copy comes from /content. */
export default function HomePage() {
  return (
    <>
      <Hero
        content={hero}
        behavior={
          <ShowpieceBoundary>
            <HeroMotion />
          </ShowpieceBoundary>
        }
      />
      <FreePromise {...freePromise} />
      <TrustBar title={sectionTitles.trust.title} entries={trustEntries} />
      <HowItWorks {...howItWorks} />
      <BuildPaths {...buildPaths} />
      <AiWriterDemo
        content={aiDemo}
        behavior={
          <ShowpieceBoundary>
            <AiDemoMotion />
          </ShowpieceBoundary>
        }
      />
      <CategoryGrid
        {...sectionTitles.categories}
        categories={categories}
        hrefFor={urls.resumeSampleCategory}
      />
      <TemplateShowcase
        {...sectionTitles.templates}
        templates={templates}
        filters={templateFilters}
        hrefFor={urls.resumeStartWithTemplate}
        galleryCta={{ label: "See all templates", href: urls.resumeTemplates }}
      />
      <CoverLetterPromo {...coverLetterPromo} />
      <Testimonials {...sectionTitles.testimonials} items={testimonials} />
      <TipsGrid {...sectionTitles.tips} tips={tips} />
      <FaqSection {...sectionTitles.faq} items={homeFaq} />
      <FinalCta {...finalCta} />
    </>
  );
}

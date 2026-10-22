import { authLinks, footerColumns, legalLinks } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { ButtonLink, Link } from "@/components/ui/Link";
import { FooterColumn } from "./FooterColumn";
import { Logo } from "./Logo";
import { SocialLinks } from "./SocialLinks";

export function SiteFooter() {
  return (
    <footer className="bg-surface-inverse text-ink-inverse" data-theme-scope="inverse">
      <Container size="wide" className="flex flex-col gap-14 py-16 lg:flex-row lg:justify-between">
        <div className="flex max-w-sm flex-col gap-4">
          <Logo onInverse className="self-start" />
          <p className="text-lead opacity-85">{siteConfig.tagline}</p>
        </div>
        <div className="grid grid-cols-1 gap-10 min-[480px]:grid-cols-2 md:grid-cols-4 md:gap-12">
          {footerColumns.map((col) => (
            <FooterColumn key={col.label} title={col.label} links={col.links} />
          ))}
          <FooterColumn title="Stay Connected">
            <SocialLinks />
          </FooterColumn>
          <FooterColumn title="Get Started" links={[authLinks.signIn, authLinks.signUp]}>
            <ButtonLink href={authLinks.getStarted.href} variant="accent" className="self-start">
              {authLinks.getStarted.label}
            </ButtonLink>
          </FooterColumn>
        </div>
      </Container>
      <div className="border-t border-current/15">
        <Container
          size="wide"
          className="flex flex-col gap-3 py-6 text-sm opacity-85 sm:flex-row sm:items-center sm:justify-between"
        >
          <p>
            © {siteConfig.copyrightYear} {siteConfig.name}. All rights reserved.
          </p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap items-center gap-x-1">
              {legalLinks.map((link, i) => (
                <li key={link.href} className="flex items-center gap-x-1">
                  {i > 0 ? <span aria-hidden="true">·</span> : null}
                  <Link
                    tone="plain"
                    href={link.href}
                    className="inline-flex min-h-8 items-center px-1 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </div>
    </footer>
  );
}

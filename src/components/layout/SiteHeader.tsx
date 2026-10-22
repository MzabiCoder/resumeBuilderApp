import { Suspense } from "react";
import { mainNav } from "@/config/navigation";
import { Container } from "@/components/ui/Container";
import { AccountActions } from "./AccountActions";
import { HeaderScrollBehavior } from "./HeaderScrollBehavior";
import { Logo } from "./Logo";
import { MainNav } from "./MainNav";
import { MobileNav } from "./MobileNav";
import { SignedOutActions } from "./SignedOutActions";

const HEADER_ID = "site-header";

/** Sticky header; background solidifies once the page scrolls (data-scrolled). */
export function SiteHeader() {
  return (
    <header
      id={HEADER_ID}
      data-scrolled="true"
      className="group/header sticky top-0 z-40 h-(--header-height) border-b border-transparent transition-[background-color,border-color,box-shadow] duration-(--duration-base) data-[scrolled=false]:bg-transparent data-[scrolled=true]:border-border data-[scrolled=true]:bg-surface/92 data-[scrolled=true]:shadow-sm data-[scrolled=true]:backdrop-blur-md"
    >
      <HeaderScrollBehavior targetId={HEADER_ID} />
      <Container size="wide" className="flex h-full items-center gap-6">
        <Logo />
        <MainNav groups={mainNav} className="hidden lg:block" />
        <div className="ml-auto hidden lg:block">
          <Suspense fallback={<SignedOutActions />}>
            <AccountActions />
          </Suspense>
        </div>
        <div className="ml-auto lg:hidden">
          <MobileNav groups={mainNav}>
            <Suspense fallback={<SignedOutActions layout="stacked" />}>
              <AccountActions layout="stacked" />
            </Suspense>
          </MobileNav>
        </div>
      </Container>
    </header>
  );
}

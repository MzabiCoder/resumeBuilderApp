import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

/** Public-site chrome: header, the skip-link target `<main id="main">`, footer. */
export function MarketingShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="flex-1 focus-visible:outline-none">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}

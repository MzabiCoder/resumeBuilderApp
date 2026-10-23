import { Suspense, type ReactNode } from "react";
import { Logo } from "@/components/layout/Logo";
import { Toaster } from "@/components/ui/Toaster";
import { BuilderHydration } from "./BuilderHydration";
import { SaveStatus } from "./SaveStatus";
import { PrintRoot } from "./print";
import NextLink from "next/link";

/** Focused app chrome for the builder: logo, save status, exit. No marketing nav. */
export function BuilderShell({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/80">
        <div className="mx-auto flex max-w-[90rem] items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-10">
          <Logo />
          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <SaveStatus />
            </div>
            <NextLink
              href="/"
              className="inline-flex min-h-11 items-center rounded-full px-3 text-sm font-semibold underline-offset-4 hover:underline"
            >
              Exit builder
            </NextLink>
          </div>
        </div>
      </header>
      <main id="main" tabIndex={-1} className="flex flex-1 flex-col focus-visible:outline-none">
        <div className="px-4 pt-3 sm:hidden">
          <SaveStatus />
        </div>
        {children}
      </main>
      <Suspense fallback={null}>
        <BuilderHydration />
      </Suspense>
      <PrintRoot />
      <Toaster />
    </>
  );
}

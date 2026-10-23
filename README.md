# HireReady — free AI resume & cover letter builder

Next.js 16 (App Router, Cache Components, Turbopack) · React 19 · TypeScript strict · Tailwind v4 · Radix UI.

## Scripts

| Command                           | What it does                                                                                                                                      |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run dev`                     | Dev server on :3000                                                                                                                               |
| `npm run build && npm start`      | Production build/serve                                                                                                                            |
| `npm run typecheck`               | `next typegen` + `tsc --noEmit`                                                                                                                   |
| `npm run lint`                    | ESLint (Next + strict jsx-a11y), zero warnings allowed                                                                                            |
| `npm run format` / `format:check` | Prettier (+ Tailwind class sorting)                                                                                                               |
| `npm test`                        | Vitest + Testing Library (incl. token contrast checks)                                                                                            |
| `npm run e2e`                     | Playwright + axe on every route, desktop + mobile (needs a build)                                                                                 |
| `npm run lhci`                    | Lighthouse CI with budgets (needs a build; set `CHROME_PATH` if Chrome isn't installed). Uses DevTools throttling — see _Performance measurement_ |
| `npm run analyze`                 | Turbopack bundle analysis → `.next/diagnostics/analyze`                                                                                           |

## Structure

See `src/` folders: `components/{ui,layout,seo}`, `config/` (brand, nav, routes, headers), `lib/`, `styles/`. The design system is documented in `design-system.md`.

## Storybook

`npm run storybook` (http://localhost:6006) · `npm run build-storybook` · `npm run test:storybook` (renders every
story in light + dark and fails on errors or axe violations — runs in CI).

- Stories live next to components as `*.stories.tsx`: UI primitives, layout (MainNav, Logo), resume templates
  (switch template via controls; empty state), builder steps (store seeded with the sample resume).
- Toolbar **Theme** switches light/dark (`data-theme`); the **Accessibility** panel runs axe on every story
  (`a11y.test: "error"`).
- Tailwind runs through `@tailwindcss/vite` (Next uses the Turbopack loader). `nextjs.appDirectory` is `false`:
  Storybook 10.6.2's app-router mock is incompatible with Next 16.4's `useRouter`; revisit on upgrade.

## Content

All marketing copy lives in `src/content/*` and is typed against Zod schemas in `src/content/schema.ts`. `npm test` validates every file, so a broken copy edit fails CI. Rich text supports `**bold**` and `*italic*` only. Motion-section editing rules are in `SHOWPIECES.md`.

### Image slots (swap in custom art without touching components)

| Slot                | Where                                              | Current                                                                                                   |
| ------------------- | -------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Hero visual         | `hero.visual` / `hero.resume` in `content/home.ts` | Live-rendered sample resume (`ResumeArt`): real text, no image request                                    |
| Template previews   | `templates[].preview` in `content/templates.ts`    | Schematic `TemplateThumbnail`; replaced by `scripts/export-template-previews` AVIF/WebP output in Phase 3 |
| Cover letter visual | `coverLetterPromo.letter` in `content/home.ts`     | Live-rendered sample letter (`LetterArt`)                                                                 |
| Logo                | `siteConfig.logo` + `public/brand/`                | Placeholder SVG wordmark                                                                                  |

Illustrations: none yet. Lucide icons are used via `components/marketing/icon-map.ts`; an unDraw set recoloured to the palette can be added as inline SVG components.

## Pre-launch checklist

- [ ] Final brand name, domain (`NEXT_PUBLIC_SITE_URL`) and logo in `src/config/site.ts` + `public/brand/`
- [ ] Real social URLs in `siteConfig.social`
- [ ] Replace placeholder testimonials and trust claims with **real, consented, verified** entries (`verified: true`). The FTC rule on fake reviews applies.
- [ ] Add one honest sentence on how the site is funded (FAQ)
- [ ] Legal review of Terms and Privacy (currently DRAFT)
- [ ] Re-check the AI provider's API data-use terms against the FAQ claim

## Performance measurement

- **CI gate uses DevTools throttling** (`lighthouserc.json` → `settings.throttlingMethod: "devtools"`: real 4× CPU + slow-4G
  applied to the page). Lighthouse's default _simulated_ (Lantern) throttling is unreliable against `localhost`: the
  unthrottled trace finishes every request before first paint (observed LCP ≈ 0.1 s), so Lantern attributes all JS to the
  LCP node and reports ≈ 3 s even though the SSR'd `<h1>` does not depend on any script. Re-check with simulated throttling
  (or PageSpeed Insights) against a deployed preview before launch.
- **JS budget**: the spec's 120 KB applies to _first-party_ JS (well under budget since dropping Radix NavigationMenu; check with `npm run analyze`).
  Lighthouse can only assert total script transfer, so CI caps total JS at 210 KB (framework ≈ 154 KB gz is fixed cost).
- **Known artifact**: the hero showpiece starts after `load` + idle; under throttling it occasionally overlaps Lighthouse's
  snapshot (text captured mid-fade → a false contrast hit / no TTI window). LHCI asserts on the best of 3 runs.

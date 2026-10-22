# HireReady — free AI resume & cover letter builder

Next.js 16 (App Router, Cache Components, Turbopack) · React 19 · TypeScript strict · Tailwind v4 · Radix UI.

## Scripts
| Command | What it does |
|---|---|
| `npm run dev` | Dev server on :3000 |
| `npm run build && npm start` | Production build/serve |
| `npm run typecheck` | `next typegen` + `tsc --noEmit` |
| `npm run lint` | ESLint (Next + strict jsx-a11y), zero warnings allowed |
| `npm run format` / `format:check` | Prettier (+ Tailwind class sorting) |
| `npm test` | Vitest + Testing Library (incl. token contrast checks) |
| `npm run e2e` | Playwright + axe on every route, desktop + mobile (needs a build) |
| `npm run lhci` | Lighthouse CI with budgets (needs a build; set `CHROME_PATH` if Chrome isn't installed) |
| `npm run analyze` | Turbopack bundle analysis → `.next/diagnostics/analyze` |

## Structure
See `src/` folders: `components/{ui,layout,seo}`, `config/` (brand, nav, routes, headers), `lib/`, `styles/`. The design system is documented in `design-system.md`.

## Content
All marketing copy lives in `src/content/*` and is typed against Zod schemas in `src/content/schema.ts`. `npm test` validates every file, so a broken copy edit fails CI. Rich text supports `**bold**` and `*italic*` only. Motion-section editing rules are in `SHOWPIECES.md`.

### Image slots (swap in custom art without touching components)
| Slot | Where | Current |
|---|---|---|
| Hero visual | `hero.visual` / `hero.resume` in `content/home.ts` | Live-rendered sample resume (`ResumeArt`): real text, no image request |
| Template previews | `templates[].preview` in `content/templates.ts` | Schematic `TemplateThumbnail`; replaced by `scripts/export-template-previews` AVIF/WebP output in Phase 3 |
| Cover letter visual | `coverLetterPromo.letter` in `content/home.ts` | Live-rendered sample letter (`LetterArt`) |
| Logo | `siteConfig.logo` + `public/brand/` | Placeholder SVG wordmark |

Illustrations: none yet. Lucide icons are used via `components/marketing/icon-map.ts`; an unDraw set recoloured to the palette can be added as inline SVG components.

## Pre-launch checklist
- [ ] Final brand name, domain (`NEXT_PUBLIC_SITE_URL`) and logo in `src/config/site.ts` + `public/brand/`
- [ ] Real social URLs in `siteConfig.social`
- [ ] Replace placeholder testimonials and trust claims with **real, consented, verified** entries (`verified: true`). The FTC rule on fake reviews applies.
- [ ] Add one honest sentence on how the site is funded (FAQ)
- [ ] Legal review of Terms and Privacy (currently DRAFT)
- [ ] Re-check the AI provider's API data-use terms against the FAQ claim

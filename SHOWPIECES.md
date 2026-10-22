# Showpieces

Two sections get custom motion. Everything else on the site is built from the standard `ui/` + `marketing/` components and has no motion JS.

| Showpiece | Why |
|---|---|
| **Hero — a resume assembling itself** | First impression, and it shows the product itself: real resume text types in, sections slide into place, and the strength score ticks up. |
| **AI writer demo** (`#ai-writer`) | Makes the core AI value concrete: as you scroll, a vague bullet dims and is struck through while a specific, quantified one lights up word by word, with `[X%]` placeholders marked. |

The category explorer was skipped to protect the JS budget.

## The contract (applies to both)

1. **Content is normal markup.** `Hero` and `AiWriterDemo` are Server Components fed from `src/content/home.ts`, rendered in their **final** state. Elements carry `data-anim` hooks.
2. **Motion is a behaviour component that renders `null`.** `<HeroMotion />` / `<AiDemoMotion />` call `useShowpiece(targetId, load)`, which:
   - does nothing under `prefers-reduced-motion` (the motion chunk is never requested; covered by an e2e test)
   - waits for an IntersectionObserver hit before dynamically `import()`ing the motion chunk
   - catches load/init failures, marks `data-motion="failed"` and leaves the content untouched
   - runs the module's cleanup on unmount (kills timelines and ScrollTriggers, restores the DOM)
3. **Timelines only target hooks**, never copy. `createHeroTimeline(root, gsap)` and `createAiDemoTimeline(root, gsap)` are pure factories. Progress 1 equals the server-rendered state.
4. **Decorative layers** (hero gradient and grid) are `aria-hidden`, absolutely positioned, `-z-10`.
5. **No layout shift.** The resume art has a fixed aspect ratio; the AI demo is scrubbed, not pinned; word animation is opacity-only.
6. Each behaviour is wrapped in `<ShowpieceBoundary>` (an error boundary with a `null` fallback).

Why `import()` inside the hook instead of `next/dynamic`: the behaviour has no UI to render, and `import()` in an effect gives the same code-splitting (no SSR, loaded on demand) with less wrapper code.

## Hero — `src/components/showpieces/hero/`

| Hook | Effect |
|---|---|
| `#hero[data-showpiece="hero"]` | Root / observer target (`rootMargin: 0px`) |
| `[data-anim="resume-section"]` | Fades out briefly, then slides and fades back in, staggered |
| `[data-anim="type"]` | Its *current* text is re-typed character by character |
| `[data-anim="score"][data-value]` | Counts 0 → `data-value` |
| `[data-anim="badge"]` | Pops in |
| `.hero-headline`, `[data-anim="hero-cta"]` | Deliberately **not** animated: the h1 is the LCP element and stays static |

Bundle: GSAP core, **~26 KB gzipped**, loaded only once the hero is visible. The timeline code itself is under 1 KB.

## AI writer demo — `src/components/showpieces/ai-demo/`

| Hook | Effect |
|---|---|
| `#ai-writer[data-showpiece="ai-demo"]` | Root / observer target (`rootMargin: 200px`) |
| `[data-anim="ai-stage"]` | ScrollTrigger range (`top 75%` → `bottom 45%`, scrub 0.6) |
| `[data-anim="ai-before"]` | Strike-through colour fades in; words dim |
| `[data-anim="ai-after"]` | Words split by `splitWords()` (nested `<mark>` preserved) and lit in sequence |
| `[data-anim="ai-score"][data-from][data-to]` | Counts from → to |
| `[data-anim="ai-meter"][data-from][data-to]` | Bar `scaleX` from → to |

Bundle: shares GSAP core with the hero, plus **~17 KB gzipped** for ScrollTrigger and the timeline, loaded only when the section is within 200px of the viewport.

## Editing content safely

- Change any string in `src/content/home.ts` (`hero`, `aiDemo`). Length doesn't matter: typing durations scale and are capped, and words are split at runtime.
- `aiDemo.after` placeholders: wrap them in square brackets (`[X%]`) and they're highlighted automatically.
- `scoreFrom` / `scoreTo` / `resume.strength.value` drive the numbers; there's nothing to update in code.
- **Don't** remove `data-anim` attributes when restyling the components. If a hook is missing, that part simply doesn't animate. Nothing breaks.
- Proof: `src/components/showpieces/showpieces.test.tsx` runs both timelines against the shipped copy **and** deliberately altered copy. It asserts every hook attaches, the end state matches the content, and cleanup restores the original DOM. `e2e/a11y.spec.ts` checks the page is complete with JS disabled.

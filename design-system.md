# HireReady design system

Source of truth: `src/styles/tokens.css` (CSS variables) → mapped to Tailwind utilities in `src/app/globals.css` (`@theme inline`). Components never use raw hex values.

## Colour
| Token | Light | Dark | Use |
|---|---|---|---|
| `surface` / `-raised` / `-sunken` | #faf8f4 / #fff / #f1ede5 | #0f1120 / #181b30 / #0a0c17 | Warm "paper" chrome so white resume previews pop |
| `ink` / `ink-muted` | #141726 / #4a5068 | #f2f0eb / #a9aec6 | Text |
| `primary` (+`-hover`, `-soft`, `on-primary`) | #2f3bc9 ultramarine | #8f98ff | Actions, links, focus |
| `accent` / `accent-strong` | #e2572b / #b23c15 | #ff8a5c / #ff9a72 | Warm vermilion. `accent` = fills & display text; `accent-strong` = body-size text |
| `success` / `warning` / `danger` (+`-soft`) | AA on surface and on their soft fills | — | Status. Always paired with text or an icon — never colour alone |
| `border` / `border-strong` | decorative / ≥3:1 control outlines | — | WCAG 1.4.11 |
| `focus` | = primary | #b0b6ff | 3px `:focus-visible` outline, ≥3:1 |

**Contrast is tested.** `src/lib/contrast.test.ts` parses `tokens.css` and asserts AA for 26 pairs in both themes. Edit a colour → run `npm test`.

Resume previews (`.resume-paper`) are always rendered on white, whatever the site theme.

## Type
- **Display:** Fraunces (variable, optical sizing), headings `h1–h3`. **Body/UI:** Inter (variable). Both self-hosted via `next/font`, `display: swap`, Latin subset.
- Fluid scale (375 → 1280px): `text-display-xl` 44→88px, `display-lg` 36→64, `display-md` 28→44, `display-sm` 22→28, `text-lead` 18→21. Body uses Tailwind defaults.
- `cn()` is configured with tailwind-merge so the custom sizes don't clash with colour utilities.

## Space, shape, elevation, motion
- Spacing: Tailwind's 4px scale. Sections: `py-16 sm:py-24`. Container: `--container-max` 76rem, `px-5 sm:px-8`.
- Radius: `sm` 6 · `md` 10 · `lg` 16 · `xl` 24 · buttons are pills.
- Shadows: `sm`, `md`, `lg` (ink-tinted), `paper` (primary-tinted glow under resume previews).
- Motion: `--duration-fast` 120ms · `base` 200ms · `slow` 420ms; `ease-out`, `ease-in-out`, `ease-spring`. All durations collapse to 0 under `prefers-reduced-motion`.

## Dark mode
Follows the OS by default. `data-theme="light|dark"` on `<html>` overrides it (a toggle comes later). The `dark:` variant handles both.

## Rules
- Touch targets ≥ 44px (`min-h-11`, `size-11`) on all controls.
- Every form control sits in `<Field>` (visible label, hint, error via `aria-describedby`, "(required)" in text).
- Interactive primitives come from Radix (`radix-ui`), restyled here.

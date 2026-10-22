import type { Testimonial } from "./schema";

/**
 * PLACEHOLDER — not real reviews. `Testimonials` renders nothing until entries
 * are real, consented (consentRef) and marked `verified: true`. The FTC rule on
 * fake reviews applies. No Review/AggregateRating JSON-LD is emitted for these.
 */
export const testimonials: Testimonial[] = [
  {
    id: "placeholder-1",
    quote: "PLACEHOLDER testimonial text.",
    name: "PLACEHOLDER",
    role: "PLACEHOLDER",
    rating: 5,
    consentRef: "PLACEHOLDER",
    verified: false,
  },
  {
    id: "placeholder-2",
    quote: "PLACEHOLDER testimonial text.",
    name: "PLACEHOLDER",
    role: "PLACEHOLDER",
    rating: 5,
    consentRef: "PLACEHOLDER",
    verified: false,
  },
  {
    id: "placeholder-3",
    quote: "PLACEHOLDER testimonial text.",
    name: "PLACEHOLDER",
    role: "PLACEHOLDER",
    rating: 5,
    consentRef: "PLACEHOLDER",
    verified: false,
  },
];

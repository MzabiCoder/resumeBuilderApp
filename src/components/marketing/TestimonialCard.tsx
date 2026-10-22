import type { Testimonial } from "@/content/schema";
import { Card } from "@/components/ui/Card";
import { StarRating } from "@/components/ui/StarRating";

export interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card as="li" className="flex flex-col gap-4">
      <StarRating value={testimonial.rating} />
      <blockquote className="text-lead">
        <p>“{testimonial.quote}”</p>
      </blockquote>
      <p className="mt-auto text-sm">
        <span className="font-semibold text-ink">{testimonial.name}</span>
        <span className="block text-ink-muted">{testimonial.role}</span>
      </p>
    </Card>
  );
}

import { ChevronRight } from "lucide-react";
import { Link } from "@/components/ui/Link";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, type Crumb } from "@/lib/seo/structured-data";
import { cn } from "@/lib/cn";

export interface BreadcrumbsProps {
  /** Ordered from home to the current page; the last item is the current page. */
  items: readonly Crumb[];
  className?: string;
}

/** Visible breadcrumb trail + BreadcrumbList JSON-LD from the same data. */
export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
      <JsonLd data={breadcrumbJsonLd(items)} />
      <ol className="flex flex-wrap items-center gap-1 text-ink-muted">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1">
              {i > 0 ? <ChevronRight aria-hidden="true" className="size-3.5" /> : null}
              {last ? (
                <span aria-current="page" className="font-medium text-ink">
                  {item.label}
                </span>
              ) : (
                <Link
                  tone="nav"
                  href={item.href}
                  className="inline-flex min-h-6 items-center hover:underline"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { TrustBar } from "./TrustBar";
import { Testimonials } from "./Testimonials";
import { FaqSection } from "./FaqSection";
import { TemplateShowcase } from "./TemplateShowcase";
import { trustEntries } from "@/content/trust";
import { testimonials } from "@/content/testimonials";
import { homeFaq } from "@/content/faq";
import { templateFilters, templates } from "@/content/templates";

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    prefetch: _p,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
    prefetch?: boolean;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

describe("verified-only social proof", () => {
  it("renders nothing for the shipped placeholder entries", () => {
    const { container: a } = render(<TrustBar title="Trusted" entries={trustEntries} />);
    const { container: b } = render(<Testimonials title="Reviews" items={testimonials} />);
    expect(a).toBeEmptyDOMElement();
    expect(b).toBeEmptyDOMElement();
  });
  it("renders verified entries only", () => {
    const items = [
      { ...testimonials[0]!, id: "real", quote: "It worked.", name: "A. Person", verified: true },
      { ...testimonials[1]!, id: "fake", quote: "Unverified", verified: false },
    ];
    render(<Testimonials title="Reviews" items={items} />);
    expect(screen.getByText("“It worked.”")).toBeInTheDocument();
    expect(screen.queryByText(/Unverified/)).not.toBeInTheDocument();
  });
});

describe("FaqSection", () => {
  it("server-renders every answer and emits plain-text FAQPage JSON-LD", () => {
    const { container } = render(<FaqSection title="FAQ" items={homeFaq} />);
    for (const item of homeFaq) expect(screen.getByText(item.question)).toBeInTheDocument();
    const ld = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')!.textContent!,
    );
    expect(ld["@type"]).toBe("FAQPage");
    expect(ld.mainEntity).toHaveLength(homeFaq.length);
    expect(JSON.stringify(ld)).not.toContain("**");
  });
});

describe("TemplateShowcase filter", () => {
  it("filters server-rendered cards and announces the result", async () => {
    render(
      <TemplateShowcase
        title="Templates"
        templates={templates}
        filters={templateFilters}
        hrefFor={(id) => `/t/${id}`}
      />,
    );
    await userEvent.click(screen.getByRole("button", { name: "Creative" }));
    expect(screen.getByRole("button", { name: "Creative" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    const visible = templates.filter((t) => t.tags.includes("creative"));
    expect(
      screen.getAllByRole("listitem").filter((li) => !li.hidden && li.dataset.tags),
    ).toHaveLength(visible.length);
    expect(
      screen.getByText(`Showing ${visible.length} template${visible.length === 1 ? "" : "s"}`),
    ).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProgressBar } from "./ProgressBar";
import { StarRating } from "./StarRating";
import { Section } from "./Section";
import { SkipLink } from "./SkipLink";

describe("ProgressBar", () => {
  it("exposes a clamped value with a text alternative", () => {
    render(<ProgressBar value={140} label="Step 8 of 8 — Finalize" />);
    const bar = screen.getByRole("progressbar", { name: "Step 8 of 8 — Finalize" });
    expect(bar).toHaveAttribute("aria-valuenow", "100");
    expect(bar).toHaveAttribute("aria-valuetext", "100% complete");
  });
});

describe("StarRating", () => {
  it("is a single labelled image", () => {
    render(<StarRating value={4} />);
    expect(screen.getByRole("img", { name: "4 out of 5 stars" })).toBeInTheDocument();
  });
});

describe("Section", () => {
  it("is a labelled landmark with an anchor id", () => {
    render(<Section id="faq" title="Questions" />);
    const region = screen.getByRole("region", { name: "Questions" });
    expect(region).toHaveAttribute("id", "faq");
  });
});

describe("SkipLink", () => {
  it("targets main", () => {
    render(<SkipLink />);
    expect(screen.getByRole("link", { name: "Skip to main content" })).toHaveAttribute(
      "href",
      "#main",
    );
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("defaults to type=button and fires onClick", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save</Button>);
    const btn = screen.getByRole("button", { name: "Save" });
    expect(btn).toHaveAttribute("type", "button");
    await userEvent.click(btn);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("is busy and not clickable while loading, keeping its label", async () => {
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Exporting
      </Button>,
    );
    const btn = screen.getByRole("button", { name: "Exporting" });
    expect(btn).toHaveAttribute("aria-busy", "true");
    expect(btn).toBeDisabled();
    await userEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders its child with button styles when asChild", () => {
    render(
      <Button asChild>
        <a href="/x">Go</a>
      </Button>,
    );
    const link = screen.getByRole("link", { name: "Go" });
    expect(link.className).toContain("rounded-full");
  });
});

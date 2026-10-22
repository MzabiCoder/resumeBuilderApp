import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Stepper } from "./Stepper";

const steps = [
  { id: "template", label: "Template" },
  { id: "contact", label: "Contact" },
  { id: "experience", label: "Experience" },
];

describe("Stepper", () => {
  it("marks the current step, completed steps in text and announces position", () => {
    render(
      <Stepper
        steps={steps}
        currentIndex={2}
        completed={new Set(["template"])}
        onStepSelect={() => {}}
      />,
    );
    expect(screen.getByRole("button", { name: /experience/i })).toHaveAttribute(
      "aria-current",
      "step",
    );
    expect(screen.getByRole("button", { name: /template\s*\(completed\)/i })).toBeInTheDocument();
    expect(screen.getByText("Step 3 of 3: Experience")).toBeInTheDocument();
  });

  it("is keyboard operable and reports the selected index", async () => {
    const onSelect = vi.fn();
    render(<Stepper steps={steps} currentIndex={0} onStepSelect={onSelect} />);
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.keyboard("{Enter}");
    expect(onSelect).toHaveBeenCalledWith(1);
  });
});

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Field } from "./Field";
import { Input } from "./Input";
import { Select } from "./Select";
import { Textarea } from "./Textarea";

describe("Field wiring", () => {
  it("labels the input, links hint + error and marks invalid/required in text", () => {
    render(
      <Field label="Email" hint="We never share it." error="Enter a valid email" required>
        <Input type="email" autoComplete="email" />
      </Field>,
    );
    const input = screen.getByRole("textbox", { name: /email/i });
    expect(input).toBeRequired();
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription(/We never share it\..*Enter a valid email/);
    expect(screen.getByText("(required)")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveTextContent("Enter a valid email");
  });

  it("works for textarea and select", () => {
    render(
      <>
        <Field label="Summary">
          <Textarea />
        </Field>
        <Field label="Tone">
          <Select options={[{ value: "pro", label: "Professional" }]} />
        </Field>
      </>,
    );
    expect(screen.getByRole("textbox", { name: "Summary" })).not.toHaveAttribute("aria-invalid");
    expect(screen.getByRole("combobox", { name: "Tone" })).toBeInTheDocument();
  });
});

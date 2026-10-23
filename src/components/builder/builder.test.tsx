import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createEmptyResume } from "@/lib/resume/schema";
import { useResumeStore } from "@/lib/resume/store";
import { useToastStore } from "@/lib/toast-store";
import { ContactForm, ExperienceForm, SkillsForm, SummaryForm } from "./forms";
import { MonthYearField } from "./fields";
import { isStepComplete } from "./steps";
import { PrintRoot } from "./print";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn() }) }));

beforeEach(() => {
  localStorage.clear();
  useResumeStore.setState({ doc: createEmptyResume(), hydrated: true, saveStatus: "idle" });
});

const doc = () => useResumeStore.getState().doc;

describe("ContactForm", () => {
  it("writes to the store and validates email on blur", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.type(screen.getByLabelText("First name"), "Ada");
    expect(doc().contact.firstName).toBe("Ada");
    const email = screen.getByLabelText("Email");
    expect(email).toHaveAttribute("autocomplete", "email");
    await user.type(email, "ada@");
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    await user.tab();
    expect(screen.getByRole("alert")).toHaveTextContent(/name@example.com/);
    expect(email).toHaveAttribute("aria-invalid", "true");
  });
});

describe("ExperienceForm", () => {
  it("adds a position, focuses it, splits bullets per line, reorders and removes", async () => {
    const user = userEvent.setup();
    render(<ExperienceForm />);
    await user.click(screen.getByRole("button", { name: "Add a position" }));
    const role = await screen.findByLabelText("Job title");
    await vi.waitFor(() => expect(role).toHaveFocus());
    await user.type(role, "Nurse");
    await user.type(screen.getByLabelText("What did you achieve?"), "One{Enter}Two");
    expect(doc().experience[0]?.bullets).toEqual(["One", "Two"]);

    await user.click(screen.getByRole("button", { name: "Add another position" }));
    const second = screen.getByRole("group", { name: "Position 2" });
    await user.click(within(second).getByRole("button", { name: /Move Position 2 up/ }));
    expect(doc().experience[1]?.role).toBe("Nurse");

    await user.click(screen.getByRole("button", { name: "Remove Position 2: Nurse" }));
    expect(doc().experience).toHaveLength(1);
    await vi.waitFor(() =>
      expect(screen.getByRole("button", { name: "Add another position" })).toHaveFocus(),
    );
    // Undo via the toast action restores the item in place.
    const queued = useToastStore.getState().toasts.at(-1);
    expect(queued?.title).toBe("Position removed");
    act(() => queued?.action?.onClick());
    expect(doc().experience.map((e) => e.role)).toEqual(["", "Nurse"]);
  });

  it("disables the end date while 'currently work here' is checked", async () => {
    const user = userEvent.setup();
    useResumeStore.getState().addItem("experience");
    render(<ExperienceForm />);
    await user.click(screen.getByLabelText("I currently work here"));
    expect(screen.getByLabelText("End date month")).toBeDisabled();
    expect(doc().experience[0]?.current).toBe(true);
  });
});

describe("MonthYearField", () => {
  it("composes YYYY / YYYY-MM values", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { rerender } = render(
      <MonthYearField legend="Start date" value="" onChange={onChange} />,
    );
    expect(screen.getByRole("group", { name: "Start date" })).toBeInTheDocument();
    await user.selectOptions(screen.getByLabelText("Start date year"), "2020");
    expect(onChange).toHaveBeenLastCalledWith("2020");
    rerender(<MonthYearField legend="Start date" value="2020" onChange={onChange} />);
    await user.selectOptions(screen.getByLabelText("Start date month"), "March");
    expect(onChange).toHaveBeenLastCalledWith("2020-03");
  });
});

describe("SkillsForm & SummaryForm", () => {
  it("adds skills with a level and counts summary characters", async () => {
    const user = userEvent.setup();
    render(
      <>
        <SkillsForm />
        <SummaryForm />
      </>,
    );
    await user.click(screen.getByRole("button", { name: "Add a skill" }));
    await user.type(screen.getByLabelText("Skill 1"), "Triage");
    await user.selectOptions(screen.getByLabelText("Level"), "Advanced");
    expect(doc().skills[0]).toMatchObject({ name: "Triage", level: 5 });
    await user.type(screen.getByLabelText("Professional summary"), "Caring nurse");
    expect(screen.getByText("12 / 1200")).toBeInTheDocument();
    expect(isStepComplete("skills", doc())).toBe(true);
    expect(isStepComplete("summary", doc())).toBe(true);
    expect(isStepComplete("contact", doc())).toBe(false);
  });
});

describe("PrintRoot", () => {
  it("renders an unscaled copy into <body> only while printing and names the PDF", () => {
    useResumeStore.getState().updateContact({ firstName: "Ada", lastName: "Lovelace" });
    document.title = "Builder";
    render(<PrintRoot />);
    expect(document.getElementById("resume-print-root")).toBeNull();
    act(() => void window.dispatchEvent(new Event("beforeprint")));
    const root = document.getElementById("resume-print-root");
    expect(root?.parentElement).toBe(document.body);
    expect(root).toHaveTextContent("Ada Lovelace");
    expect(document.title).toBe("Ada Lovelace – Resume");
    act(() => void window.dispatchEvent(new Event("afterprint")));
    expect(document.getElementById("resume-print-root")).toBeNull();
    expect(document.title).toBe("Builder");
  });
});

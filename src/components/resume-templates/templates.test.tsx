import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { createEmptyResume, resumeSchema, type ResumeDocument } from "@/lib/resume/schema";
import { builtTemplateIds, getTemplateComponent, isBuiltTemplate } from "./registry";
import { Clarity } from "./templates";
import { ResumeTemplate } from "./ResumeTemplate";
import { sampleResumeDoc } from "./sample-resume";
import { contactLine, skillText } from "./ResumeLayout";

describe("sample resume", () => {
  it("is a valid document", () => {
    expect(resumeSchema.safeParse(sampleResumeDoc).success).toBe(true);
  });
});

describe.each(builtTemplateIds)("template %s", (id) => {
  it("renders an ATS-friendly heading structure", () => {
    render(<ResumeTemplate templateId={id} doc={sampleResumeDoc} />);
    const article = screen.getByRole("article", { name: "Resume preview" });
    expect(article).toHaveAttribute("data-template", id);
    expect(within(article).getByRole("heading", { level: 2 })).toHaveTextContent("Jordan Rivera");
    const sections = within(article).getAllByRole("heading", { level: 3 });
    expect(sections).toHaveLength(4);
    expect(within(article).getAllByRole("heading", { level: 4 }).length).toBe(4);
    expect(article.querySelector("table, img, a")).toBeNull();
  });

  it("shows a placeholder name and no sections when empty", () => {
    render(<ResumeTemplate templateId={id} doc={createEmptyResume(id)} />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Your Name");
    expect(screen.queryAllByRole("heading", { level: 3 })).toHaveLength(0);
  });
});

describe("content rules", () => {
  const doc: ResumeDocument = {
    ...createEmptyResume(),
    experience: [
      {
        id: "e1",
        role: "Nurse",
        employer: "City Hospital",
        location: "",
        start: "",
        end: "",
        current: false,
        bullets: ["Cared for 20 patients a shift", "", "  "],
      },
      // Entirely blank entries are hidden.
      {
        id: "e2",
        role: "",
        employer: "",
        location: "",
        start: "",
        end: "",
        current: false,
        bullets: [""],
      },
    ],
    skills: [
      { id: "s1", name: "Triage", level: 5 },
      { id: "s2", name: "  ", level: 3 },
      { id: "s3", name: "EHR", level: 0 },
    ],
  };

  it("drops empty bullets, blank entries and blank skills; shows levels as text", () => {
    render(<Clarity doc={doc} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(1);
    expect(screen.getAllByRole("heading", { level: 4 })).toHaveLength(1);
    expect(screen.getByText("Triage (Advanced), EHR")).toBeInTheDocument();
  });

  it("builds a plain-text contact line and skill labels", () => {
    expect(
      contactLine({
        ...sampleResumeDoc,
        contact: { ...sampleResumeDoc.contact, phone: "", website: "" },
      }),
    ).toBe("jordan.rivera@example.com · Austin, TX · linkedin.com/in/jordan-rivera");
    expect(skillText({ id: "x", name: " Go ", level: 3 })).toBe("Go (Intermediate)");
  });

  it("uses unique heading ids per copy", () => {
    render(
      <>
        <Clarity doc={sampleResumeDoc} idPrefix="a" />
        <Clarity doc={sampleResumeDoc} idPrefix="b" />
      </>,
    );
    const ids = [...document.querySelectorAll("h3[id]")].map((h) => h.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("registry", () => {
  it("falls back to Clarity for unknown or unbuilt templates", () => {
    expect(getTemplateComponent("meridian")).toBe(Clarity);
    expect(isBuiltTemplate("meridian")).toBe(false);
    expect(isBuiltTemplate("toString")).toBe(false);
    expect(isBuiltTemplate("ledger")).toBe(true);
  });
});

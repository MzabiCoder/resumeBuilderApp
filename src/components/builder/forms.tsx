"use client";

import { useState, type ReactNode } from "react";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { emailError, type Contact } from "@/lib/resume/schema";
import { useResumeStore } from "@/lib/resume/store";
import { toast } from "@/lib/toast-store";
import { CharCount, focusLater, MonthYearField } from "./fields";

/* ---------- limits mirror lib/resume/schema.ts so saved drafts always validate ---------- */
const LIMITS = {
  experience: 20,
  education: 10,
  skills: 40,
  bullets: 12,
  bullet: 400,
  summary: 1200,
};

/** Remove with an Undo toast; focus goes to `fallbackFocus` now and back to the item on undo. */
function removeWithUndo<K extends "experience" | "education" | "skills">(
  key: K,
  id: string,
  what: string,
  fallbackFocus: string,
  focusOnRestore: string,
) {
  const { removeItem, insertItem } = useResumeStore.getState();
  const removed = removeItem(key, id);
  focusLater(fallbackFocus);
  if (!removed) return;
  toast.info(`${what} removed`, undefined, {
    action: {
      label: "Undo",
      altText: `Undo removing ${what.toLowerCase()}`,
      onClick: () => {
        insertItem(key, removed.item, removed.index);
        focusLater(focusOnRestore);
      },
    },
  });
}

/* ---------------------------------- Contact ---------------------------------- */

const contactFields: Array<{
  key: keyof Contact;
  label: string;
  max: number;
  type?: string;
  autoComplete: string;
  hint?: string;
  wide?: boolean;
}> = [
  { key: "firstName", label: "First name", max: 60, autoComplete: "given-name" },
  { key: "lastName", label: "Last name", max: 60, autoComplete: "family-name" },
  {
    key: "title",
    label: "Job title",
    max: 100,
    autoComplete: "organization-title",
    hint: "The role you want, e.g. “Registered Nurse”.",
    wide: true,
  },
  { key: "email", label: "Email", max: 254, type: "email", autoComplete: "email" },
  { key: "phone", label: "Phone", max: 40, type: "tel", autoComplete: "tel" },
  { key: "city", label: "City", max: 80, autoComplete: "address-level2" },
  { key: "region", label: "State / region", max: 80, autoComplete: "address-level1" },
  {
    key: "linkedin",
    label: "LinkedIn",
    max: 200,
    autoComplete: "url",
    hint: "Optional, e.g. linkedin.com/in/your-name",
  },
  { key: "website", label: "Website or portfolio", max: 200, type: "url", autoComplete: "url" },
];

export function ContactForm() {
  const contact = useResumeStore((s) => s.doc.contact);
  const updateContact = useResumeStore((s) => s.updateContact);
  const [touched, setTouched] = useState(false);
  const emailMsg = touched ? emailError(contact.email) : undefined;

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {contactFields.map((f) => (
        <Field
          key={f.key}
          label={f.label}
          hint={f.hint}
          error={f.key === "email" ? emailMsg : undefined}
          className={f.wide ? "sm:col-span-2" : undefined}
        >
          <Input
            name={f.key}
            type={f.type ?? "text"}
            autoComplete={f.autoComplete}
            maxLength={f.max}
            value={contact[f.key]}
            onChange={(e) => updateContact({ [f.key]: e.target.value })}
            onBlur={f.key === "email" ? () => setTouched(true) : undefined}
            spellCheck={f.key === "email" || f.type === "url" ? false : undefined}
          />
        </Field>
      ))}
    </div>
  );
}

/* --------------------------------- List chrome -------------------------------- */

function ItemCard({
  legend,
  index,
  count,
  onMove,
  onRemove,
  children,
}: {
  legend: string;
  index: number;
  count: number;
  onMove: (delta: -1 | 1) => void;
  onRemove: () => void;
  children: ReactNode;
}) {
  return (
    <fieldset className="min-w-0 rounded-xl border border-border bg-surface-raised p-4 sm:p-5">
      <legend className="px-1 font-semibold text-ink">{legend}</legend>
      <div className="mb-3 flex flex-wrap justify-end gap-1">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={index === 0}
          onClick={() => onMove(-1)}
          aria-label={`Move ${legend} up`}
        >
          <ArrowUp aria-hidden="true" />
          Up
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={index === count - 1}
          onClick={() => onMove(1)}
          aria-label={`Move ${legend} down`}
        >
          <ArrowDown aria-hidden="true" />
          Down
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onRemove}
          aria-label={`Remove ${legend}`}
        >
          <Trash2 aria-hidden="true" />
          Remove
        </Button>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

function AddButton({
  id,
  label,
  disabled,
  onClick,
}: {
  id: string;
  label: string;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <Button id={id} type="button" variant="subtle" onClick={onClick} disabled={disabled}>
      <Plus aria-hidden="true" />
      {label}
    </Button>
  );
}

function EmptyHint({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-xl border border-dashed border-border p-5 text-ink-muted">{children}</p>
  );
}

/* --------------------------------- Experience --------------------------------- */

export function ExperienceForm() {
  const items = useResumeStore((s) => s.doc.experience);
  const { addItem, updateItem, moveItem } = useResumeStore.getState();

  const add = () => {
    const id = addItem("experience");
    focusLater(`${id}-role`);
  };

  return (
    <div className="flex flex-col gap-5">
      {items.length === 0 ? (
        <EmptyHint>No positions yet. Add your most recent job first.</EmptyHint>
      ) : null}
      {items.map((item, i) => {
        const legend = `Position ${i + 1}${item.role ? `: ${item.role}` : ""}`;
        return (
          <ItemCard
            key={item.id}
            legend={legend}
            index={i}
            count={items.length}
            onMove={(d) => {
              moveItem("experience", item.id, d);
              focusLater(`${item.id}-role`);
            }}
            onRemove={() =>
              removeWithUndo("experience", item.id, "Position", "add-experience", `${item.id}-role`)
            }
          >
            <Field label="Job title" id={`${item.id}-role`}>
              <Input
                maxLength={100}
                value={item.role}
                onChange={(e) => updateItem("experience", item.id, { role: e.target.value })}
              />
            </Field>
            <Field label="Employer">
              <Input
                maxLength={100}
                autoComplete="organization"
                value={item.employer}
                onChange={(e) => updateItem("experience", item.id, { employer: e.target.value })}
              />
            </Field>
            <Field label="Location" className="sm:col-span-2" hint="City, or “Remote”.">
              <Input
                maxLength={100}
                value={item.location}
                onChange={(e) => updateItem("experience", item.id, { location: e.target.value })}
              />
            </Field>
            <MonthYearField
              legend="Start date"
              value={item.start}
              onChange={(start) => updateItem("experience", item.id, { start })}
            />
            <div className="flex flex-col gap-3">
              <MonthYearField
                legend="End date"
                value={item.current ? "" : item.end}
                disabled={item.current}
                onChange={(end) => updateItem("experience", item.id, { end })}
              />
              <label className="flex min-h-11 items-center gap-3 text-sm font-medium">
                <input
                  type="checkbox"
                  className="size-5 accent-(--color-primary)"
                  checked={item.current}
                  onChange={(e) => updateItem("experience", item.id, { current: e.target.checked })}
                />
                I currently work here
              </label>
            </div>
            <Field
              label="What did you achieve?"
              hint="One achievement per line. Start with a verb and include numbers where you can."
              className="sm:col-span-2"
            >
              <Textarea
                rows={5}
                maxLength={LIMITS.bullets * (LIMITS.bullet + 1)}
                value={item.bullets.join("\n")}
                onChange={(e) =>
                  updateItem("experience", item.id, {
                    bullets: e.target.value
                      .split("\n")
                      .slice(0, LIMITS.bullets)
                      .map((l) => l.slice(0, LIMITS.bullet)),
                  })
                }
              />
            </Field>
          </ItemCard>
        );
      })}
      <AddButton
        id="add-experience"
        label={items.length ? "Add another position" : "Add a position"}
        disabled={items.length >= LIMITS.experience}
        onClick={add}
      />
    </div>
  );
}

/* --------------------------------- Education ---------------------------------- */

export function EducationForm() {
  const items = useResumeStore((s) => s.doc.education);
  const { addItem, updateItem, moveItem } = useResumeStore.getState();

  return (
    <div className="flex flex-col gap-5">
      {items.length === 0 ? (
        <EmptyHint>No education yet. Add your highest or most relevant first.</EmptyHint>
      ) : null}
      {items.map((item, i) => {
        const legend = `Education ${i + 1}${item.school ? `: ${item.school}` : ""}`;
        const set = (patch: Partial<typeof item>) => updateItem("education", item.id, patch);
        return (
          <ItemCard
            key={item.id}
            legend={legend}
            index={i}
            count={items.length}
            onMove={(d) => {
              moveItem("education", item.id, d);
              focusLater(`${item.id}-school`);
            }}
            onRemove={() =>
              removeWithUndo(
                "education",
                item.id,
                "Education",
                "add-education",
                `${item.id}-school`,
              )
            }
          >
            <Field label="School or institution" id={`${item.id}-school`} className="sm:col-span-2">
              <Input
                maxLength={120}
                value={item.school}
                onChange={(e) => set({ school: e.target.value })}
              />
            </Field>
            <Field label="Degree or qualification" hint="e.g. B.Sc., High school diploma">
              <Input
                maxLength={120}
                value={item.degree}
                onChange={(e) => set({ degree: e.target.value })}
              />
            </Field>
            <Field label="Field of study">
              <Input
                maxLength={120}
                value={item.field}
                onChange={(e) => set({ field: e.target.value })}
              />
            </Field>
            <Field label="Location" className="sm:col-span-2">
              <Input
                maxLength={100}
                value={item.location}
                onChange={(e) => set({ location: e.target.value })}
              />
            </Field>
            <MonthYearField
              legend="Start date"
              value={item.start}
              onChange={(start) => set({ start })}
            />
            <MonthYearField
              legend="Graduation date"
              value={item.end}
              onChange={(end) => set({ end })}
            />
            <Field
              label="Details"
              hint="Optional: honours, GPA (if strong), relevant coursework."
              className="sm:col-span-2"
            >
              <Textarea
                rows={2}
                maxLength={400}
                value={item.details}
                onChange={(e) => set({ details: e.target.value })}
              />
            </Field>
          </ItemCard>
        );
      })}
      <AddButton
        id="add-education"
        label={items.length ? "Add more education" : "Add education"}
        disabled={items.length >= LIMITS.education}
        onClick={() => focusLater(`${addItem("education")}-school`)}
      />
    </div>
  );
}

/* ----------------------------------- Skills ----------------------------------- */

const levelOptions = [
  { value: "0", label: "Don’t show level" },
  { value: "1", label: "Beginner" },
  { value: "3", label: "Intermediate" },
  { value: "5", label: "Advanced" },
];

export function SkillsForm() {
  const items = useResumeStore((s) => s.doc.skills);
  const { addItem, updateItem } = useResumeStore.getState();

  return (
    <div className="flex flex-col gap-4">
      {items.length === 0 ? <EmptyHint>No skills yet.</EmptyHint> : null}
      <ul className="flex flex-col gap-3">
        {items.map((item, i) => (
          <li
            key={item.id}
            className="grid items-end gap-3 rounded-xl border border-border bg-surface-raised p-4 sm:grid-cols-[1fr_12rem_auto]"
          >
            <Field label={`Skill ${i + 1}`} id={`${item.id}-name`}>
              <Input
                maxLength={60}
                value={item.name}
                onChange={(e) => updateItem("skills", item.id, { name: e.target.value })}
              />
            </Field>
            <Field label="Level">
              <Select
                options={levelOptions}
                value={String(item.level >= 4 ? 5 : item.level === 2 ? 1 : item.level)}
                onChange={(e) => updateItem("skills", item.id, { level: Number(e.target.value) })}
              />
            </Field>
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                const next = items[i + 1] ?? items[i - 1];
                removeWithUndo(
                  "skills",
                  item.id,
                  "Skill",
                  next ? `${next.id}-name` : "add-skill",
                  `${item.id}-name`,
                );
              }}
              aria-label={`Remove skill ${i + 1}${item.name ? `: ${item.name}` : ""}`}
            >
              <Trash2 aria-hidden="true" />
              Remove
            </Button>
          </li>
        ))}
      </ul>
      <AddButton
        id="add-skill"
        label="Add a skill"
        disabled={items.length >= LIMITS.skills}
        onClick={() => focusLater(`${addItem("skills")}-name`)}
      />
    </div>
  );
}

/* ----------------------------------- Summary ---------------------------------- */

export function SummaryForm() {
  const summary = useResumeStore((s) => s.doc.summary);
  const setSummary = useResumeStore((s) => s.setSummary);
  return (
    <div className="flex flex-col gap-2">
      <Field
        label="Professional summary"
        hint="Tip: mention years of experience, 1–2 strengths and the kind of role you want."
      >
        <Textarea
          rows={7}
          maxLength={LIMITS.summary}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          aria-describedby="summary-count"
        />
      </Field>
      <CharCount id="summary-count" value={summary} max={LIMITS.summary} />
    </div>
  );
}

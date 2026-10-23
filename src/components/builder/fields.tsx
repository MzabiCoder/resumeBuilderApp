"use client";

import { useId } from "react";
import { Select } from "@/components/ui/Select";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const monthOptions = MONTHS.map((label, i) => ({ value: String(i + 1).padStart(2, "0"), label }));

function yearOptions(now = new Date().getFullYear()) {
  const out: { value: string; label: string }[] = [];
  for (let y = now + 6; y >= now - 60; y--) out.push({ value: String(y), label: String(y) });
  return out;
}
const years = yearOptions();

/**
 * Month + year as two native selects (works everywhere, unlike <input type="month">).
 * Value format: "YYYY-MM", "YYYY" or "".
 */
export function MonthYearField({
  legend,
  value,
  onChange,
  disabled,
}: {
  legend: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  const id = useId();
  const [year = "", month = ""] = value ? value.split("-") : [];
  const emit = (y: string, m: string) => onChange(y ? (m ? `${y}-${m}` : y) : "");
  return (
    <fieldset className="flex min-w-0 flex-col gap-1.5" disabled={disabled}>
      <legend className="mb-1.5 text-sm font-semibold text-ink">{legend}</legend>
      <div className="grid grid-cols-2 gap-2">
        <Select
          id={`${id}-m`}
          aria-label={`${legend} month`}
          placeholder="Month"
          options={monthOptions}
          value={month}
          onChange={(e) => emit(year, e.target.value)}
        />
        <Select
          id={`${id}-y`}
          aria-label={`${legend} year`}
          placeholder="Year"
          options={years}
          value={year}
          onChange={(e) => emit(e.target.value, month)}
        />
      </div>
    </fieldset>
  );
}

/** Live character count, announced politely only near the limit. */
export function CharCount({ value, max, id }: { value: string; max: number; id: string }) {
  const left = max - value.length;
  return (
    <p
      id={id}
      className="text-right text-sm text-ink-muted"
      aria-live={left <= 50 ? "polite" : "off"}
    >
      {value.length} / {max}
    </p>
  );
}

/** Focus an element by id after React has committed (used after add/remove). */
export function focusLater(id: string) {
  requestAnimationFrame(() => document.getElementById(id)?.focus());
}

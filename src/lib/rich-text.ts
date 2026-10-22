/** Tiny inline-markdown subset for content strings: **bold** and *italic*. */

export type RichToken = { type: "text" | "strong" | "em"; value: string };

const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;

export function tokenize(input: string): RichToken[] {
  return input
    .split(pattern)
    .filter((part) => part.length > 0)
    .map((part): RichToken => {
      if (part.startsWith("**") && part.endsWith("**") && part.length > 4) return { type: "strong", value: part.slice(2, -2) };
      if (part.startsWith("*") && part.endsWith("*") && part.length > 2) return { type: "em", value: part.slice(1, -1) };
      return { type: "text", value: part };
    });
}

/** Strip markers — for JSON-LD, meta descriptions and aria labels. */
export function toPlainText(input: string): string {
  return tokenize(input)
    .map((t) => t.value)
    .join("");
}

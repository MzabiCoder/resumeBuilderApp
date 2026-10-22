import { tokenize } from "@/lib/rich-text";

export interface RichTextProps {
  text: string;
}

/** Renders content strings with **bold** / *italic* — no HTML injection possible. */
export function RichText({ text }: RichTextProps) {
  return (
    <>
      {tokenize(text).map((t, i) =>
        t.type === "strong" ? (
          <strong key={i} className="font-semibold text-ink">
            {t.value}
          </strong>
        ) : t.type === "em" ? (
          <em key={i}>{t.value}</em>
        ) : (
          t.value
        ),
      )}
    </>
  );
}

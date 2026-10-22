export interface JsonLdProps {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
}

/** Structured data script. `<` is escaped so content can never close the script tag. */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger -- serialised, escaped JSON only
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

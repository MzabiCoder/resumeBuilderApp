/** Shared look for text-like controls (Input, Textarea, Select). */
export const controlStyles = [
  "w-full rounded-md border-2 border-border-strong bg-surface-raised px-3.5 text-base text-ink",
  "placeholder:text-ink-muted/80 transition-[border-color,box-shadow] duration-(--duration-fast)",
  "hover:border-ink focus-visible:border-primary focus-visible:outline-offset-1",
  "disabled:cursor-not-allowed disabled:bg-surface-sunken disabled:opacity-70",
  "aria-invalid:border-danger",
].join(" ");

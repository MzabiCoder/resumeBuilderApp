import type { LucideIcon, LucideProps } from "lucide-react";

export interface IconProps extends Omit<LucideProps, "ref"> {
  icon: LucideIcon;
  /** Provide only if the icon conveys meaning on its own; otherwise it is hidden from AT. */
  label?: string;
}

export function Icon({ icon: Glyph, label, ...rest }: IconProps) {
  return label ? (
    <Glyph role="img" aria-label={label} {...rest} />
  ) : (
    <Glyph aria-hidden="true" focusable="false" {...rest} />
  );
}

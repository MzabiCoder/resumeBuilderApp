import { cva, type VariantProps } from "class-variance-authority";

/** Shared so links styled as buttons (`ButtonLink`) and `<Button>` never drift apart. */
export const buttonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap select-none",
    "transition-[background-color,color,box-shadow,transform] duration-(--duration-base) ease-out",
    "active:translate-y-px disabled:pointer-events-none disabled:opacity-55 aria-disabled:pointer-events-none aria-disabled:opacity-55",
    "[&_svg]:size-[1.1em] [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        primary: "bg-primary text-on-primary shadow-sm hover:bg-primary-hover hover:shadow-md",
        accent: "bg-accent text-on-accent shadow-sm hover:shadow-md hover:brightness-105",
        outline:
          "border-2 border-ink/80 bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-ink-inverse",
        ghost: "bg-transparent text-ink hover:bg-surface-sunken",
        subtle: "bg-primary-soft text-primary hover:bg-primary hover:text-on-primary",
        danger: "bg-danger text-surface-raised hover:brightness-110",
      },
      size: {
        sm: "min-h-9 px-4 text-sm",
        md: "min-h-11 px-5 text-[0.9375rem]",
        lg: "min-h-13 px-7 text-base",
        icon: "size-11 p-0",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;

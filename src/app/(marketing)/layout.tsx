import { MarketingShell } from "@/components/layout/MarketingShell";

export default function MarketingLayout({ children }: LayoutProps<"/">) {
  return <MarketingShell>{children}</MarketingShell>;
}

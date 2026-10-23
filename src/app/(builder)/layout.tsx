import { BuilderShell } from "@/components/builder/BuilderShell";

export default function BuilderLayout({ children }: LayoutProps<"/">) {
  return <BuilderShell>{children}</BuilderShell>;
}

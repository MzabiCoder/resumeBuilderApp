import { redirect } from "next/navigation";
import { builderStepHref } from "@/components/builder/steps";

export default function BuilderIndex() {
  redirect(builderStepHref("contact"));
}

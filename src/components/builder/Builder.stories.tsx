import type { Decorator, Meta, StoryObj } from "@storybook/nextjs-vite";
import { sampleResumeDoc } from "@/components/resume-templates/sample-resume";
import { createEmptyResume, type ResumeDocument } from "@/lib/resume/schema";
import { useResumeStore } from "@/lib/resume/store";
import { Toaster } from "@/components/ui/Toaster";
import { ContactForm, EducationForm, ExperienceForm, SkillsForm, SummaryForm } from "./forms";
import { FinalizeStep } from "./FinalizeStep";
import { LivePreview } from "./LivePreview";

/** Seed the shared store per story (no localStorage writes are awaited in Storybook). */
function withDoc(doc: ResumeDocument): Decorator {
  return function WithDoc(Story) {
    useResumeStore.setState({ doc, hydrated: true, saveStatus: "idle" });
    return (
      <div className="max-w-3xl">
        <Story />
        <Toaster />
      </div>
    );
  };
}

const meta = {
  title: "Builder/Steps",
  component: ContactForm,
  decorators: [withDoc(sampleResumeDoc)],
} satisfies Meta<typeof ContactForm>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Contact: Story = {};
export const ContactEmpty: Story = { decorators: [withDoc(createEmptyResume())] };
export const Experience: Story = { render: () => <ExperienceForm /> };
export const ExperienceEmpty: Story = {
  render: () => <ExperienceForm />,
  decorators: [withDoc(createEmptyResume())],
};
export const Education: Story = { render: () => <EducationForm /> };
export const Skills: Story = { render: () => <SkillsForm /> };
export const Summary: Story = { render: () => <SummaryForm /> };
export const Finish: Story = { render: () => <FinalizeStep /> };
export const Preview: Story = { render: () => <LivePreview idPrefix="sb-preview" /> };

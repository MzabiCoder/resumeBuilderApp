import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { createEmptyResume } from "@/lib/resume/schema";
import { builtTemplateIds } from "./registry";
import { ResumeTemplate } from "./ResumeTemplate";
import { sampleResumeDoc } from "./sample-resume";

const meta = {
  title: "Resume/Templates",
  component: ResumeTemplate,
  args: { templateId: "clarity", doc: sampleResumeDoc },
  argTypes: { templateId: { control: "inline-radio", options: builtTemplateIds } },
  parameters: { backgrounds: { disable: true } },
  decorators: [
    (Story) => (
      <div className="overflow-auto bg-[#e9e6df] p-6">
        <div className="w-[816px] shadow-lg">
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof ResumeTemplate>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Clarity: Story = { args: { templateId: "clarity" } };
export const Ledger: Story = { args: { templateId: "ledger" } };
export const Baseline: Story = { args: { templateId: "baseline" } };
/** What a new user sees in the live preview before typing anything. */
export const Empty: Story = { args: { doc: createEmptyResume() } };

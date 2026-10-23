import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mainNav } from "@/config/navigation";
import { MainNav } from "./MainNav";
import { Logo } from "./Logo";

const meta = {
  title: "Layout/MainNav",
  component: MainNav,
  args: { groups: mainNav },
  parameters: {
    docs: {
      description: {
        component:
          "WAI-ARIA disclosure navigation. Click or Enter/Space toggles; ArrowDown opens and focuses the first link; Arrow/Home/End move; Esc closes and restores focus.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-[28rem]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MainNav>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Brand: StoryObj<typeof Logo> = {
  render: () => (
    <div className="flex flex-wrap items-center gap-8">
      <Logo />
      <div className="rounded-lg bg-[#141726] p-4">
        <Logo onInverse />
      </div>
    </div>
  ),
};

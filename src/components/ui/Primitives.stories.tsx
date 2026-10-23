import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ArrowRight, Download, Plus } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./Accordion";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { Card } from "./Card";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./Dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./DropdownMenu";
import { ErrorState } from "./ErrorState";
import { Field } from "./Field";
import { Input } from "./Input";
import { ProgressBar } from "./ProgressBar";
import { Select } from "./Select";
import { StarRating } from "./StarRating";
import { Stepper } from "./Stepper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs";
import { Textarea } from "./Textarea";
import { Toaster } from "./Toaster";
import { Tooltip } from "./Tooltip";
import { toast } from "@/lib/toast-store";

const meta = {
  title: "UI/Primitives",
  component: Button,
  tags: ["autodocs"],
  args: { children: "Build my resume" },
  argTypes: {
    variant: { control: "select", options: ["primary", "outline", "ghost", "subtle", "danger"] },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Playground: every Button prop is a control. */
export const ButtonPlayground: Story = {};

export const ButtonVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button>
        Primary <ArrowRight aria-hidden="true" />
      </Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="subtle">
        <Plus aria-hidden="true" /> Subtle
      </Button>
      <Button variant="danger">Danger</Button>
      <Button size="sm">Small</Button>
      <Button size="lg">
        <Download aria-hidden="true" /> Large
      </Button>
      <Button loading>Saving</Button>
      <Button disabled>Disabled</Button>
    </div>
  ),
};

export const FormControls: Story = {
  render: () => (
    <div className="grid max-w-xl gap-5">
      <Field label="Full name" hint="As it should appear on your resume." required>
        <Input autoComplete="name" />
      </Field>
      <Field label="Email" error="Enter an email like name@example.com.">
        <Input type="email" defaultValue="ada@" />
      </Field>
      <Field label="Experience level">
        <Select
          placeholder="Choose one"
          options={[
            { value: "entry", label: "Entry level" },
            { value: "mid", label: "Mid level" },
            { value: "senior", label: "Senior" },
          ]}
        />
      </Field>
      <Field label="Summary">
        <Textarea rows={4} />
      </Field>
    </div>
  ),
};

export const Feedback: Story = {
  render: () => (
    <div className="grid max-w-xl gap-6">
      <div className="flex gap-2">
        <Badge>Free</Badge>
        <Badge>ATS-friendly</Badge>
      </div>
      <ProgressBar value={64} label="Resume strength" showValue />
      <ProgressBar value={100} label="Profile complete" tone="success" showValue />
      <StarRating value={4.5} />
      <Card className="p-6">A plain card surface.</Card>
      <ErrorState headingLevel="h2" />
      <div className="flex flex-wrap gap-3">
        <Button variant="outline" onClick={() => toast.success("Saved")}>
          Success toast
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.info("Position removed", undefined, {
              action: { label: "Undo", altText: "Undo removing position", onClick: () => {} },
            })
          }
        >
          Toast with Undo
        </Button>
        <Button variant="outline" onClick={() => toast.error("Couldn’t save", "Storage is full.")}>
          Error toast
        </Button>
      </div>
      <Toaster />
    </div>
  ),
};

export const Overlays: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Open dialog</Button>
        </DialogTrigger>
        <DialogContent title="Clear this resume?" description="This can’t be undone.">
          <div className="mt-6 flex justify-end">
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Open sheet</Button>
        </DialogTrigger>
        <DialogContent title="Resume preview" layout="sheet">
          <p className="mt-4">Bottom sheet on small screens.</p>
        </DialogContent>
      </Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Duplicate</DropdownMenuItem>
          <DropdownMenuItem tone="danger">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Tooltip content="Downloads a PDF">
        <Button variant="ghost">Hover or focus me</Button>
      </Tooltip>
    </div>
  ),
};

export const Navigation: Story = {
  render: () => (
    <div className="grid max-w-2xl gap-10">
      <Stepper
        label="Resume sections"
        steps={[
          { id: "contact", label: "Contact" },
          { id: "experience", label: "Experience" },
          { id: "education", label: "Education" },
          { id: "finish", label: "Finish" },
        ]}
        currentIndex={1}
        completed={new Set(["contact"])}
        onStepSelect={() => {}}
      />
      <Tabs defaultValue="resume">
        <TabsList aria-label="Document type">
          <TabsTrigger value="resume">Resume</TabsTrigger>
          <TabsTrigger value="letter">Cover letter</TabsTrigger>
        </TabsList>
        <TabsContent value="resume">Resume content</TabsContent>
        <TabsContent value="letter">Cover letter content</TabsContent>
      </Tabs>
      <Accordion type="single" collapsible>
        <AccordionItem value="a">
          <AccordionTrigger headingLevel="h3">Is it really free?</AccordionTrigger>
          <AccordionContent>Yes — build and download without paying.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="b">
          <AccordionTrigger headingLevel="h3">Do I need an account?</AccordionTrigger>
          <AccordionContent>No. Drafts are saved on your device.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

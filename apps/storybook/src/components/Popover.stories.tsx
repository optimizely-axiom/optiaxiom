import type { Meta, StoryObj } from "@storybook/react-vite";

import { Popover, PopoverContent, PopoverTrigger } from "@optiaxiom/react";
import { expect, screen, userEvent } from "storybook/test";

type Story = StoryObj<typeof Popover>;

export default {
  args: {
    defaultOpen: true,
  },
  component: Popover,
} as Meta<typeof Popover>;

export const Basic: Story = {
  args: {
    children: (
      <>
        <PopoverTrigger>Toggle Popover</PopoverTrigger>
        <PopoverContent>This is a popover element.</PopoverContent>
      </>
    ),
    defaultOpen: false,
  },
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button"));
    await expect(screen.queryByRole("dialog")).toBeInTheDocument();
  },
};

export const Disabled: Story = {
  args: {
    children: (
      <>
        <PopoverTrigger disabled>Disabled</PopoverTrigger>
        <PopoverContent />
      </>
    ),
    defaultOpen: false,
  },
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button"));
    await expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  },
};

export const CustomPositioning: Story = {
  args: {
    children: (
      <>
        <PopoverTrigger>Toggle Popover</PopoverTrigger>
        <PopoverContent align="end">
          This popover is on custom position.
        </PopoverContent>
      </>
    ),
  },
};

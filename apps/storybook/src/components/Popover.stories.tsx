import type { Meta, StoryObj } from "@storybook/react-vite";

import { IconPen } from "@optiaxiom/icons";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@optiaxiom/react";
import { expect, screen, userEvent, waitFor } from "storybook/test";

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
        <PopoverContent aria-label="Toggle Popover Popover">
          This is a popover element.
        </PopoverContent>
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

export const NarrowContent: Story = {
  args: {
    children: (
      <>
        <PopoverTrigger>Toggle Popover</PopoverTrigger>
        <PopoverContent aria-label="Edit link" p="4">
          <Button
            appearance="subtle"
            aria-label="Edit link"
            icon={<IconPen />}
          />
        </PopoverContent>
      </>
    ),
  },
};

export const TriggerWidth: Story = {
  args: {
    children: (
      <>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent aria-label="Open Popover" minW="trigger">
          Hi
        </PopoverContent>
      </>
    ),
  },
  play: async ({ canvas }) => {
    // The trigger must stay narrower than the list floor (120px) for this
    // story to show that PopoverContent has no floor.
    await expect(
      canvas.getByRole("button", { hidden: true }).offsetWidth,
    ).toBeLessThan(120);
  },
};

export const NarrowViewport: Story = {
  args: {
    children: (
      <>
        <PopoverTrigger>Toggle Popover</PopoverTrigger>
        <PopoverContent aria-label="Toggle Popover Popover" maxW="sm">
          This popover is wider than a 320px viewport, so it shrinks to the
          space the window has instead of being cut off.
        </PopoverContent>
      </>
    ),
  },
  globals: {
    viewport: { value: "reflow" },
  },
  play: async () => {
    await expect(window.innerWidth).toBe(320);
    await waitFor(async () => {
      const rect = screen.getByRole("dialog").getBoundingClientRect();
      // Radix parks the content above the viewport until it's positioned.
      await expect(rect.top).toBeGreaterThanOrEqual(0);
      await expect(rect.left).toBeGreaterThanOrEqual(0);
      await expect(rect.right).toBeLessThanOrEqual(window.innerWidth);
    });
  },
};

export const CustomPositioning: Story = {
  args: {
    children: (
      <>
        <PopoverTrigger>Toggle Popover</PopoverTrigger>
        <PopoverContent align="end" aria-label="Toggle Popover Popover">
          This popover is on custom position.
        </PopoverContent>
      </>
    ),
  },
};

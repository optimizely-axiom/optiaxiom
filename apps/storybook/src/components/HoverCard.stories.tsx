import type { Meta, StoryObj } from "@storybook/react-vite";

import { Text } from "@optiaxiom/react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@optiaxiom/react/unstable";
import { expect, screen, userEvent } from "storybook/test";

type Story = StoryObj<typeof HoverCard>;

export default {
  component: HoverCard,
  render: (args) => (
    <Text color="fg.default" fontSize="md">
      This is some text with <HoverCard {...args} /> demo.
    </Text>
  ),
} as Meta<typeof HoverCard>;

export const Basic: Story = {
  args: {
    children: (
      <>
        <HoverCardTrigger
          bg="bg.secondary"
          color="fg.default"
          cursor="pointer"
          fontSize="sm"
          href="data:,"
          px="12"
          py="4"
          rounded="full"
        >
          Sample Hover
        </HoverCardTrigger>
        <HoverCardContent aria-label="Content">
          The majestic world of turtles
        </HoverCardContent>
      </>
    ),
  },
  play: async ({ canvas }) => {
    await userEvent.hover(canvas.getByRole("link"));
    await expect(
      await screen.findByRole("dialog", { name: "Content" }),
    ).toBeInTheDocument();
  },
};

export const CustomPositioning: Story = {
  args: {
    children: (
      <>
        <HoverCardTrigger
          bg="bg.warning"
          cursor="pointer"
          fontSize="sm"
          fontWeight="500"
          href="data:,"
          px="12"
          py="4"
          rounded="full"
        >
          inline hover card
        </HoverCardTrigger>
        <HoverCardContent align="end" aria-label="Content">
          This Hover card is on custom position.
        </HoverCardContent>
      </>
    ),
  },
  play: async ({ canvas }) => {
    await userEvent.hover(canvas.getByRole("link"));
    await expect(
      await screen.findByRole("dialog", { name: "Content" }),
    ).toBeInTheDocument();
  },
};

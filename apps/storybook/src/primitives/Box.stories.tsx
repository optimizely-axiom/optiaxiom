import type { Meta, StoryObj } from "@storybook/react";

import { Box, Text } from "@optiaxiom/react";

export default {
  component: Box,
} as Meta<typeof Box>;

type Story = StoryObj<typeof Box>;

export const Basic: Story = {
  args: {
    bg: "bg.accent.subtle",
    children: <Text>Hello World!</Text>,
    m: "lg",
    p: "lg",
    rounded: "sm",
  },
};

export const Composition: Story = {
  args: {
    asChild: true,
    bg: "bg.warning.subtle",
    children: <Text>Hello World!</Text>,
    p: "lg",
  },
};

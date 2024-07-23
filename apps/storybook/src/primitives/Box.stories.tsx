import type { Meta, StoryObj } from "@storybook/react";

import { Box, Text } from "@optiaxiom/react";

export default {
  component: Box,
} as Meta<typeof Box>;

type Story = StoryObj<typeof Box>;

export const Basic: Story = {
  args: {
    bg: "brand.50",
    children: <Text>Hello World!</Text>,
    m: "lg",
    p: "lg",
    rounded: "sm",
  },
};

export const Composition: Story = {
  args: {
    asChild: true,
    bg: "orange.50",
    children: <Text>Hello World!</Text>,
    p: "lg",
  },
};

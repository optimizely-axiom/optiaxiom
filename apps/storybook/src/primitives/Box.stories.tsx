import type { Meta, StoryObj } from "@storybook/react";

import { Box, Text } from "@optiaxiom/react";

const meta: Meta<typeof Box> = {
  component: Box,
};

export default meta;

type Story = StoryObj<typeof Box>;

export const Primary: Story = {
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

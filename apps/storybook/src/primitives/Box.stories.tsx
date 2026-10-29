import type { Meta, StoryObj } from "@storybook/react-vite";

import { Box, Text } from "@optiaxiom/react";
import { expect } from "storybook/test";

export default {
  component: Box,
} as Meta<typeof Box>;

type Story = StoryObj<typeof Box>;

export const Basic: Story = {
  args: {
    bg: "bg.accent.subtle",
    children: <Text>Hello World!</Text>,
    m: "24",
    p: "24",
    rounded: "sm",
  },
};

export const Composition: Story = {
  args: {
    asChild: true,
    bg: "bg.warning.subtle",
    children: <Text>Hello World!</Text>,
    p: "24",
  },
};

export const ResponsiveSpacing: Story = {
  args: {
    ...Basic.args,
    p: ["16", "32", "64"],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Hello World!").parentElement).toHaveStyle({
      padding: "64px",
    });
  },
};

export const ResponsiveSpacingOverride: Story = {
  args: {
    ...Basic.args,
    p: { sm: "8" },
    pl: { sm: "32" },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Hello World!").parentElement).toHaveStyle({
      paddingBottom: "8px",
      paddingLeft: "32px",
      paddingRight: "8px",
      paddingTop: "8px",
    });
  },
};

export const ResponsiveRounded: Story = {
  args: {
    ...Basic.args,
    rounded: ["none", "xl"],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Hello World!").parentElement).toHaveStyle({
      borderRadius: "16px",
    });
  },
};

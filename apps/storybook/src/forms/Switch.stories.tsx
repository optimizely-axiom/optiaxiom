import type { Meta, StoryObj } from "@storybook/react";

import { Switch } from "@optiaxiom/react";

export default {
  args: {
    label: "On label",
  },
  component: Switch,
} as Meta<typeof Switch>;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {};

export const Large: Story = {
  args: {
    size: "lg",
  },
};

export const Disabled: Story = {
  args: {
    defaultChecked: true,
    disabled: true,
  },
};

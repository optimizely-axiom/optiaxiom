import type { Meta, StoryObj } from "@storybook/react";

import { Switch } from "@optiaxiom/react";

const meta: Meta<typeof Switch> = {
  args: {
    id: "switch-1",
    label: "On label",
  },
  component: Switch,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Switch>;
export const Default: Story = {
  args: {
    defaultChecked: false,
    disabled: false,
    readonly: false,
    size: "default",
  },
};

export const Large: Story = {
  args: {
    defaultChecked: false,
    disabled: false,
    readonly: false,
    size: "lg",
  },
};

export const Disabled: Story = {
  args: {
    defaultChecked: true,
    disabled: true,
    readonly: false,
    size: "default",
  },
};

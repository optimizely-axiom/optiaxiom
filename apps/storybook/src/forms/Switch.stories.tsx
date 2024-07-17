import type { Meta, StoryObj } from "@storybook/react";

import { Switch, Text } from "@optiaxiom/react";

export default {
  args: {
    children: "Label",
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

export const HelperText: Story = {
  args: {
    endDecorator: (
      <Text color="fg.secondary" fontSize="sm">
        Helper Text
      </Text>
    ),
  },
};

export const Disabled: Story = {
  args: {
    defaultChecked: true,
    disabled: true,
  },
};

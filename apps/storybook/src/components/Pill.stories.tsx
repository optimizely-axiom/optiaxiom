import type { Meta, StoryObj } from "@storybook/react-vite";

import { Group } from "@optiaxiom/react";
import { Pill } from "@optiaxiom/react/unstable";
import { action } from "storybook/actions";

export default {
  component: Pill,
} as Meta<typeof Pill>;

type Story = StoryObj<typeof Pill>;

export const Basic: Story = {
  args: {
    children: "Label",
    size: "sm",
  },
};

export const Sizes: Story = {
  render: (args) => (
    <Group flexDirection="column" gap="12">
      <Group gap="12">
        <Pill {...args} size="xs">
          Configured Commerce
        </Pill>
        <Pill {...args} size="xs">
          3
        </Pill>
      </Group>
      <Group gap="12">
        <Pill {...args} size="sm">
          Configured Commerce
        </Pill>
        <Pill {...args} size="sm">
          3
        </Pill>
      </Group>
    </Group>
  ),
};

export const Dismiss: Story = {
  args: {
    children: "Label",
    onDismiss: action("onDismiss"),
  },
};

export const Readonly: Story = {
  args: {
    children: "Readonly",
    onClick: action("onClick"),
    onDismiss: action("onDismiss"),
    readOnly: true,
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled",
    disabled: true,
    onDismiss: action("onDismiss"),
  },
};

export const LongContent: Story = {
  args: {
    children: "This is a very long text",
  },
  render: (args) => (
    <Group flexDirection="column" gap="16">
      <Pill {...args} w="3xl" />
      <Pill {...args} w="224" />
    </Group>
  ),
};

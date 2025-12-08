import type { Meta, StoryObj } from "@storybook/react-vite";

import { Group, Spinner } from "@optiaxiom/react";

export default {
  component: Spinner,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/qs72V79n1s9wYOcZ1TzBwM/Components-V2?node-id=3411:37560",
    },
  },
} as Meta<typeof Spinner>;

type Story = StoryObj<typeof Spinner>;

const sizes = ["2xs", "sm", "md", "xl"] as const;

export const Basic: Story = {};

export const Colors: Story = {
  render: (args) => (
    <Group gap="16">
      <Spinner {...args} appearance="default" />
      <Spinner {...args} appearance="inverse" />
    </Group>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <Group gap="16">
      {sizes.map((size) => (
        <Spinner key={size} {...args} size={size} />
      ))}
    </Group>
  ),
};

export const Label: Story = {
  args: {
    children: "Loading...",
  },
};

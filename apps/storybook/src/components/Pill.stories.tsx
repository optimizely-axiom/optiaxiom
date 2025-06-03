import type { Meta, StoryObj } from "@storybook/react-vite";

import { Flex } from "@optiaxiom/react";
import { Pill } from "@optiaxiom/react/unstable";

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
    <Flex gap="12">
      <Flex flexDirection="row" gap="12">
        <Pill {...args} size="xs">
          Configured Commerce
        </Pill>
        <Pill {...args} size="xs">
          3
        </Pill>
      </Flex>
      <Flex flexDirection="row" gap="12">
        <Pill {...args} size="sm">
          Configured Commerce
        </Pill>
        <Pill {...args} size="sm">
          3
        </Pill>
      </Flex>
    </Flex>
  ),
};

export const Disabled: Story = {
  args: {
    children: "Disabled",
    disabled: true,
  },
};

export const LongContent: Story = {
  args: {
    children: "This is a very long text",
  },
  render: (args) => (
    <Flex>
      <Pill {...args} w="3xl" />
      <Pill {...args} w="224" />
    </Flex>
  ),
};

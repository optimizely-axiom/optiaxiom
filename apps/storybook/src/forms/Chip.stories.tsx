import type { Meta, StoryObj } from "@storybook/react";

import { Avatar, Flex } from "@optiaxiom/react";
import { Chip } from "@optiaxiom/react/unstable";

export default {
  component: Chip,
} as Meta<typeof Chip>;

type Story = StoryObj<typeof Chip>;

export const Basic: Story = {
  args: {
    children: "Hello",
  },
};

export const Disabled: Story = {
  args: {
    children: "Hello",
    disabled: true,
  },
};

export const DifferentSizes: Story = {
  args: {
    children: "Chip",
  },
  render: (args) => (
    <Flex>
      <Flex flexDirection="row">
        <Chip {...args} size="sm" />
        <Chip {...args} size="md" />
        <Chip {...args} size="lg" />
      </Flex>
      <Flex flexDirection="row">
        <Chip {...args} size="sm" />
        <Chip {...args} size="md" />
        <Chip {...args} size="lg" />
      </Flex>
    </Flex>
  ),
};

export const WithAvatar: Story = {
  args: {
    children: "Hello",
    onPressedChange: () => {},
    startDecorator: <Avatar name="Jamie" size="sm" />,
  },
};

export const WithCloseButton: Story = {
  args: {
    children: "Hello",
    onPressedChange: () => {},
  },
};

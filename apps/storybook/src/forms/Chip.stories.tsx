import type { Meta, StoryObj } from "@storybook/react";

import { Avatar, Chip, Flex } from "@optiaxiom/react";

export default {
  component: Chip,
} as Meta<typeof Chip>;

type Story = StoryObj<typeof Chip>;

export const Basic: Story = {
  args: {
    children: "Hello",
    colorScheme: "neutral",
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
    colorScheme: "neutral",
    onPressedChange: () => {},
    startDecorator: <Avatar name="Jamie" size="sm" />,
  },
};

export const WithCloseButton: Story = {
  args: {
    children: "Hello",
    colorScheme: "neutral",
    onPressedChange: () => {},
  },
};

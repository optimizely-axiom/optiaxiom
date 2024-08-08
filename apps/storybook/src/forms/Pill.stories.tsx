import type { Meta, StoryObj } from "@storybook/react";

import { Avatar, Flex, Pill } from "@optiaxiom/react";

export default {
  component: Pill,
} as Meta<typeof Pill>;

type Story = StoryObj<typeof Pill>;

export const Basic: Story = {
  args: {
    children: "Hello",
  },
};

export const Readonly: Story = {
  args: {
    children: "Hello",
    readonly: true,
  },
};

export const DifferentSizes: Story = {
  args: {
    children: "Pill",
  },
  render: (args) => (
    <Flex>
      <Flex flexDirection="row">
        <Pill {...args} size="sm" />
        <Pill {...args} size="md" />
        <Pill {...args} size="lg" />
      </Flex>
      <Flex flexDirection="row">
        <Pill {...args} size="sm" />
        <Pill {...args} size="md" />
        <Pill {...args} size="lg" />
      </Flex>
    </Flex>
  ),
};

export const WithAvatar: Story = {
  args: {
    children: "Hello",
    onClose: () => {},
    startDecorator: <Avatar name="Jamie" size="sm" />,
  },
};

export const WithCloseButton: Story = {
  args: {
    children: "Hello",
    onClose: () => {},
  },
};

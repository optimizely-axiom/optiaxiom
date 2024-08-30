import type { Meta, StoryObj } from "@storybook/react";

import { Avatar, Flex, Tooltip } from "@optiaxiom/react";
import { IconUser } from "@tabler/icons-react";

const sizes = ["xs", "sm", "md", "xl", "5xl"] as const;

export default {
  component: Avatar,
  render: (args) => (
    <Flex flexDirection="row">
      {sizes.map((size) => (
        <Avatar key={size} size={size} {...args}>
          {size}
        </Avatar>
      ))}
    </Flex>
  ),
} as Meta<typeof Avatar>;

type Story = StoryObj<typeof Avatar>;

export const Basic: Story = {
  args: {
    children: "JD",
  },
};

export const Sizes: Story = {
  args: {
    name: "William Michael",
  },
};

export const Image: Story = {
  args: {
    name: "John Snow",
    src: "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80",
  },
};

export const Icon: Story = {
  args: {
    colorScheme: "purple",
    icon: <IconUser />,
    name: "Quiock Hoyon",
  },
};

export const Colors: Story = {
  render: () => (
    <Flex flexDirection="row">
      <Avatar colorScheme="neutral">KP</Avatar>
      <Avatar colorScheme="red">KP</Avatar>
      <Avatar colorScheme="blue">KP</Avatar>
      <Avatar colorScheme="green">KP</Avatar>
      <Avatar colorScheme="orange">KP</Avatar>
      <Avatar colorScheme="magenta">KP</Avatar>
      <Avatar colorScheme="gray">KP</Avatar>
      <Avatar colorScheme="slate">KP</Avatar>
      <Avatar colorScheme="brand">KP</Avatar>
      <Avatar colorScheme="purple">KP</Avatar>
      <Avatar colorScheme="yellow">KP</Avatar>
      <Avatar colorScheme="dark">KP</Avatar>
    </Flex>
  ),
};

export const TooltipStory: Story = {
  args: {
    colorScheme: "purple",
    name: "Jamie Lannister",
  },
  name: "Tooltip",
  render: (args) => (
    <Tooltip content="Jamie Lannister">
      <Avatar {...args}>JL</Avatar>
    </Tooltip>
  ),
};

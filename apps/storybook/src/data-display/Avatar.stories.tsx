import type { Meta, StoryObj } from "@storybook/react";

import { Avatar, Flex, Tooltip } from "@optiaxiom/react";
import { IconUser } from "@tabler/icons-react";

const meta: Meta<typeof Avatar> = {
  component: Avatar,
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Primary: Story = {
  args: {
    children: "JD",
  },
};

const sizes = ["xl", "lg", "md", "sm", "xs"] as const;

export const Sizes: Story = {
  args: {
    color: "purple",
    name: "Jamie Lannister",
  },
  render: (args) => (
    <Flex flexDirection="row">
      {sizes.map((size) => (
        <Avatar key={size} size={size} {...args}>
          {size}
        </Avatar>
      ))}
    </Flex>
  ),
};

export const Image: Story = {
  args: {
    name: "John Snow",
    src: "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80",
  },
  render: (args) => (
    <Flex flexDirection="row">
      {sizes.map((size) => (
        <Avatar key={size} size={size} {...args}>
          {size}
        </Avatar>
      ))}
    </Flex>
  ),
};

export const Icon: Story = {
  args: {
    color: "purple",
    icon: <IconUser />,
    name: "Quiock Hoyon",
  },
  render: (args) => (
    <Flex flexDirection="row">
      {sizes.map((size) => (
        <Avatar key={size} size={size} {...args}>
          {size}
        </Avatar>
      ))}
    </Flex>
  ),
};

export const Colors: Story = {
  render: () => (
    <Flex flexDirection="row">
      <Avatar>KP</Avatar>
      <Avatar color="red">KP</Avatar>
      <Avatar color="blue">KP</Avatar>
      <Avatar color="green">KP</Avatar>
      <Avatar color="orange">KP</Avatar>
      <Avatar color="magenta">KP</Avatar>
      <Avatar color="gray">KP</Avatar>
      <Avatar color="slate">KP</Avatar>
      <Avatar color="brand">KP</Avatar>
      <Avatar color="purple">KP</Avatar>
      <Avatar color="yellow">KP</Avatar>
      <Avatar color="dark">KP</Avatar>
    </Flex>
  ),
};

export const TooltipStory: Story = {
  args: {
    color: "purple",
    name: "Jamie Lannister",
  },
  name: "Tooltip",
  render: (args) => (
    <Tooltip content="Jamie Lannister">
      <Avatar {...args}>JL</Avatar>
    </Tooltip>
  ),
};

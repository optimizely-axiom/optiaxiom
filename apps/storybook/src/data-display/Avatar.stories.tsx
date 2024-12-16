import type { Meta, StoryObj } from "@storybook/react";

import { Avatar, Flex, Tooltip } from "@optiaxiom/react";

const fallbacks = ["user", "team"] as const;
const sizes = ["xs", "sm", "md", "lg", "xl", "3xl"] as const;

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
  render: (args) => <Avatar {...args} />,
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

export const Fallback: Story = {
  args: {
    colorScheme: "purple",
  },
  render: (args) => (
    <Flex>
      {fallbacks.map((fallback) => (
        <Flex flexDirection="row" key={fallback}>
          {sizes.map((size) => (
            <Avatar fallback={fallback} key={size} size={size} {...args} />
          ))}
        </Flex>
      ))}
    </Flex>
  ),
};

export const Colors: Story = {
  render: (args) => (
    <Flex flexDirection="row">
      <Avatar {...args} colorScheme="neutral">
        KP
      </Avatar>
      <Avatar {...args} colorScheme="purple">
        KP
      </Avatar>
    </Flex>
  ),
};

export const WithTooltip: Story = {
  args: {
    children: "JL",
    colorScheme: "purple",
    name: "Jamie Lannister",
  },
  name: "Tooltip",
  render: (args) => (
    <Tooltip content="Jamie Lannister" defaultOpen>
      <Avatar {...args} />
    </Tooltip>
  ),
};

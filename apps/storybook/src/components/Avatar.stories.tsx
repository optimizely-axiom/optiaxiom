import type { Meta, StoryObj } from "@storybook/react";

import { Avatar, Flex, Tooltip } from "@optiaxiom/react";

const fallbacks = ["user", "team"] as const;
const sizes = ["xs", "sm", "md", "lg", "xl", "3xl"] as const;

export default {
  component: Avatar,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/qs72V79n1s9wYOcZ1TzBwM/Components-V2?node-id=111:2533",
    },
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
    src: "https://i.pravatar.cc/150?img=24",
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

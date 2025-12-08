import type { Meta, StoryObj } from "@storybook/react-vite";

import { Avatar, Group, Tooltip } from "@optiaxiom/react";

const fallbacks = ["user", "team"] as const;
const sizes = ["2xs", "xs", "sm", "md", "lg", "xl", "3xl"] as const;

export default {
  component: Avatar,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/qs72V79n1s9wYOcZ1TzBwM/Components-V2?node-id=111:2533",
    },
  },
  render: (args) => (
    <Group gap="16">
      {sizes.map((size) => (
        <Avatar key={size} size={size} {...args} />
      ))}
    </Group>
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

export const Opal: Story = {
  args: {
    fallback: "opal",
  },
};

export const InitialsOverride: Story = {
  args: {
    children: "JD",
    name: "Some Name",
  },
  render: (args) => <Avatar {...args} />,
};

export const Fallback: Story = {
  args: {
    colorScheme: "purple",
  },
  render: (args) => (
    <Group flexDirection="column" gap="16">
      {fallbacks.map((fallback) => (
        <Group gap="16" key={fallback}>
          {sizes.map((size) => (
            <Avatar fallback={fallback} key={size} size={size} {...args} />
          ))}
        </Group>
      ))}
    </Group>
  ),
};

export const Colors: Story = {
  render: (args) => (
    <Group gap="16">
      <Avatar {...args} colorScheme="neutral">
        KP
      </Avatar>
      <Avatar {...args} colorScheme="purple">
        KP
      </Avatar>
    </Group>
  ),
};

export const WithTooltip: Story = {
  args: {
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

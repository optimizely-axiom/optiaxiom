import type { Meta, StoryObj } from "@storybook/react";

import { Flex, Spinner } from "@optiaxiom/react";

export default {
  component: Spinner,
} as Meta<typeof Spinner>;

type Story = StoryObj<typeof Spinner>;

const sizes = ["2xs", "sm", "md", "xl"] as const;

export const Basic: Story = {};

export const Colors: Story = {
  render: (args) => (
    <Flex flexDirection="row">
      <Spinner {...args} colorScheme="default" />
      <Spinner {...args} colorScheme="inverse" />
    </Flex>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <Flex flexDirection="row">
      {sizes.map((size) => (
        <Spinner key={size} {...args} size={size} />
      ))}
    </Flex>
  ),
};

export const Label: Story = {
  args: {
    children: "Loading...",
  },
};

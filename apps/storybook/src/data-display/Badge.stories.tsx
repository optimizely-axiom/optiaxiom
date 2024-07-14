import type { Meta, StoryObj } from "@storybook/react";

import { Badge, Flex, Heading, Text } from "@optiaxiom/react";

const meta: Meta<typeof Badge> = {
  component: Badge,
};

export default meta;

type Story = StoryObj<typeof Badge>;

const variants = [
  ["subtle", "Subtle"],
  ["solid", "Solid"],
] as const;

const Variants: Story = {
  render: (args) => (
    <Flex flexDirection="column" gap="sm">
      {variants.map(([variant, label]) => (
        <Badge {...args} key={variant} variant={variant}>
          {label}
        </Badge>
      ))}
    </Flex>
  ),
};

export const Primary: Story = {
  ...Variants,
  args: {
    colorScheme: "primary",
  },
};

export const Danger: Story = {
  ...Variants,
  args: { colorScheme: "danger" },
};

export const Info: Story = {
  ...Variants,
  args: { colorScheme: "info" },
};

export const Success: Story = {
  ...Variants,
  args: { colorScheme: "success" },
};

export const Warning: Story = {
  ...Variants,
  args: { colorScheme: "warning" },
};

export const Neutral: Story = {
  ...Variants,
  args: { colorScheme: "neutral" },
};

export const TextWithBadge: Story = {
  render: () => (
    <Flex flexDirection="row" gap="sm">
      <Text>Status:</Text>
      <Badge colorScheme="success" variant="solid">
        Active
      </Badge>
    </Flex>
  ),
};

export const HeadingWithBadge: Story = {
  render: () => (
    <Flex flexDirection="row" gap="sm">
      <Heading level="4">Status:</Heading>
      <Badge colorScheme="success" variant="solid">
        Active
      </Badge>
    </Flex>
  ),
};

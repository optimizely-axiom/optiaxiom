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

export const NotificationsCount: Story = {
  render: () => (
    <Flex>
      <Flex
        border="1"
        borderColor="neutral.100"
        flexDirection="row"
        gap="2"
        p="4"
        rounded="sm"
      >
        <Text>Notifications</Text>
        <Badge colorScheme="primary" rounded="full" variant="solid">
          8
        </Badge>
      </Flex>
      <Flex
        border="1"
        borderColor="neutral.100"
        flexDirection="row"
        gap="2"
        p="4"
        rounded="sm"
      >
        <Badge colorScheme="primary" rounded="full" variant="solid">
          8
        </Badge>
        <Text>Notifications</Text>
      </Flex>
    </Flex>
  ),
};

export const Errors: Story = {
  render: () => (
    <Flex>
      <Flex
        border="1"
        borderColor="neutral.100"
        flexDirection="row"
        gap="2"
        p="4"
        rounded="md"
      >
        <Text>Errors</Text>
        <Badge colorScheme="danger" rounded="full" variant="subtle">
          8
        </Badge>
      </Flex>
      <Flex
        border="1"
        borderColor="neutral.100"
        flexDirection="row"
        gap="2"
        p="4"
        rounded="md"
      >
        <Badge colorScheme="danger" rounded="full" variant="solid">
          8
        </Badge>
        <Text>Errors</Text>
      </Flex>
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

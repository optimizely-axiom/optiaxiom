import type { Meta, StoryObj } from "@storybook/react";

import { Badge, Button, Flex, Heading, Text } from "@optiaxiom/react";

export default {
  component: Badge,
} as Meta<typeof Badge>;

type Story = StoryObj<typeof Badge>;

const Variants: Story = {
  render: (args) => (
    <Flex>
      <Badge colorScheme="primary" {...args} />
      <Badge colorScheme="success" {...args} />
      <Badge colorScheme="warning" {...args} />
      <Badge colorScheme="danger" {...args} />
      <Badge colorScheme="neutral" {...args} />
      <Badge colorScheme="information" {...args} />
    </Flex>
  ),
};

export const Basic: Story = {
  args: {
    children: "Badge",
  },
};

export const Solid: Story = {
  ...Variants,
  args: {
    children: "Badge",
    variant: "solid",
  },
};

export const Light: Story = {
  ...Variants,
  args: {
    children: "Badge",
    variant: "light",
  },
};

export const Count: Story = {
  render: () => (
    <>
      <Flex flexDirection="row">
        <Button>
          Notifications
          <Badge colorScheme="information" variant="light">
            8
          </Badge>
        </Button>

        <Button>
          Errors
          <Badge colorScheme="danger">15</Badge>
        </Button>
      </Flex>
    </>
  ),
};

export const Inline: Story = {
  render: () => (
    <Flex>
      <Flex asChild flexDirection="row">
        <Text>
          Status
          <Badge colorScheme="success" variant="light">
            Published
          </Badge>
        </Text>
      </Flex>

      <Flex asChild flexDirection="row">
        <Heading level="4">
          Sample Heading
          <Badge colorScheme="success">New</Badge>
        </Heading>
      </Flex>
    </Flex>
  ),
};

import type { Meta, StoryObj } from "@storybook/react";

import { Badge, Button, Flex, Heading, Text } from "@optiaxiom/react";

export default {
  component: Badge,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/qs72V79n1s9wYOcZ1TzBwM/Components-V2?node-id=980:35700",
    },
  },
} as Meta<typeof Badge>;

type Story = StoryObj<typeof Badge>;

const Variants: Story = {
  render: (args) => (
    <Flex>
      <Badge intent="primary" {...args} />
      <Badge intent="success" {...args} />
      <Badge intent="warning" {...args} />
      <Badge intent="danger" {...args} />
      <Badge intent="neutral" {...args} />
      <Badge intent="information" {...args} />
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
          <Badge intent="information" variant="light">
            8
          </Badge>
        </Button>

        <Button>
          Errors
          <Badge intent="danger">15</Badge>
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
          <Badge intent="success" variant="light">
            Published
          </Badge>
        </Text>
      </Flex>

      <Flex asChild flexDirection="row">
        <Heading level="4">
          Sample Heading
          <Badge intent="success">New</Badge>
        </Heading>
      </Flex>
    </Flex>
  ),
};

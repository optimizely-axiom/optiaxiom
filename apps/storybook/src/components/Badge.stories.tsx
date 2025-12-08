import type { Meta, StoryObj } from "@storybook/react-vite";

import { Badge, Button, Group, Heading, Text } from "@optiaxiom/react";

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
    <Group flexDirection="column" gap="16">
      <Badge intent="primary" {...args} />
      <Badge intent="success" {...args} />
      <Badge intent="warning" {...args} />
      <Badge intent="danger" {...args} />
      <Badge intent="neutral" {...args} />
      <Badge intent="information" {...args} />
    </Group>
  ),
};

export const Basic: Story = {
  args: {
    children: "Badge",
  },
};

export const Strong: Story = {
  ...Variants,
  args: {
    children: "Badge",
    variant: "strong",
  },
};

export const Subtle: Story = {
  ...Variants,
  args: {
    children: "Badge",
    variant: "subtle",
  },
};

export const Count: Story = {
  render: () => (
    <>
      <Group gap="16">
        <Button
          addonAfter={
            <Badge intent="information" variant="subtle">
              1
            </Badge>
          }
        >
          Notifications
        </Button>

        <Button addonAfter={<Badge intent="danger">15</Badge>}>Errors</Button>
        <Button addonAfter={<Badge intent="warning">8</Badge>}>Warnings</Button>
        <Button addonAfter={<Badge intent="success">123</Badge>}>
          Success
        </Button>
      </Group>
    </>
  ),
};

export const Inline: Story = {
  render: () => (
    <Group flexDirection="column" gap="16">
      <Group asChild gap="16">
        <Text fontSize="md">
          Status
          <Badge intent="success" variant="subtle">
            Published
          </Badge>
        </Text>
      </Group>

      <Group asChild gap="16">
        <Heading level="4">
          Sample Heading
          <Badge intent="success">New</Badge>
        </Heading>
      </Group>
    </Group>
  ),
};

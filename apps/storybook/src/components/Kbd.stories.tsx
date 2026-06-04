import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button, Group, Kbd, Text } from "@optiaxiom/react";

export default {
  args: {
    children: "K",
    modifiers: "mod",
  },
  component: Kbd,
} as Meta<typeof Kbd>;

type Story = StoryObj<typeof Kbd>;

const appearances = [
  "default",
  "primary",
  "subtle",
  "danger",
  "danger-outline",
  "default-opal",
  "primary-opal",
] as const;

export const Basic: Story = {};

export const Variants: Story = {
  render: (args) => (
    <Group flexDirection="column" gap="16">
      <Kbd {...args} variant="outline" />
      <Kbd {...args} variant="subtle" />
    </Group>
  ),
};

export const Inline: Story = {
  render: (args) => (
    <Group flexDirection="column" gap="16">
      <Text fontSize="md">
        Press <Kbd {...args} variant="outline" /> to open the command palette.
      </Text>
      <Text fontSize="md">
        Press <Kbd {...args} variant="subtle" /> to open the command palette.
      </Text>
    </Group>
  ),
};

export const WithButton: Story = {
  args: {
    children: "↵",
  },
  render: (args) => (
    <Group gap="16">
      <Group flexDirection="column" gap="16">
        {appearances.map((appearance) => (
          <Button
            addonAfter={<Kbd {...args} variant="outline" />}
            appearance={appearance}
            key={appearance}
          >
            Submit
          </Button>
        ))}
      </Group>
      <Group flexDirection="column" gap="16">
        {appearances.map((appearance) => (
          <Button
            addonAfter={<Kbd {...args} color="current" variant="subtle" />}
            appearance={appearance}
            key={appearance}
          >
            Submit
          </Button>
        ))}
      </Group>
    </Group>
  ),
};

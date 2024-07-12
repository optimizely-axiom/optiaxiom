import type { Meta, StoryObj } from "@storybook/react";

import { Badge, Flex } from "@optiaxiom/react";

const meta: Meta<typeof Badge> = {
  component: Badge,
};

export default meta;

type Story = StoryObj<typeof Badge>;

const appearances = [
  ["neutral", "Neutral"],
  ["primary", "Primary"],
  ["danger", "Danger"],
  ["info", "Info"],
  ["warning", "Warning"],
  ["success", "Success"],
] as const;

const variants = [
  ["subtle", "Subtle"],
  ["accent", "Accent"],
] as const;

const Variants: Story = {
  render: (args) => (
    <Flex flexDirection="column" gap="sm">
      {variants.map(([variant, label]) => (
        <Badge {...args} content="2" key={variant} variant={variant}>
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

export const appearance: Story = {
  render: (args) => (
    <Flex>
      {appearances.map(([appearance, label]) => (
        <Badge {...args} appearance={appearance} key={appearance}>
          {label}
        </Badge>
      ))}
    </Flex>
  ),
};

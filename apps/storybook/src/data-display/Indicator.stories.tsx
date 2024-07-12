import type { Meta, StoryObj } from "@storybook/react";

import { Box, Button, Flex, Indicator } from "@optiaxiom/react";

const meta: Meta<typeof Indicator> = {
  component: Indicator,
};

export default meta;

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

const positions = [
  "bottom-left",
  "bottom-right",
  "top-left",
  "top-right",
  "top-middle",
  "right-middle",
  "bottom-middle",
  "left-middle",
] as const;

const Variants: Story = {
  render: (args) => (
    <Flex flexDirection="column" gap="sm">
      {variants.map(([variant, label]) => (
        <Indicator {...args} content="2" key={variant} variant={variant}>
          {label}
        </Indicator>
      ))}
    </Flex>
  ),
};

type Story = StoryObj<typeof Indicator>;

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
        <Indicator
          {...args}
          appearance={appearance}
          content="2"
          key={appearance}
        >
          {label}
        </Indicator>
      ))}
    </Flex>
  ),
};

export const AllPositions: Story = {
  args: {
    colorScheme: "primary",
    variant: "accent",
  },
  render: (args) => (
    <Flex gap="lg">
      {positions.map((position) => (
        <Box key={position}>
          <Indicator {...args} content="2" position={position}>
            <Button alignItems="center" bg="brand.100" justifyContent="center">
              {position}
            </Button>
          </Indicator>
        </Box>
      ))}
    </Flex>
  ),
};

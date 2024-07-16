import type { Meta, StoryObj } from "@storybook/react";

import { Chip, Flex } from "@optiaxiom/react";
import { IconChevronDown } from "@tabler/icons-react";

export default {
  argTypes: {
    onClick: { action: "click" },
  },
  component: Chip,
} as Meta<typeof Chip>;

type Story = StoryObj<typeof Chip>;

const Variants: Story = {
  render: (args) => (
    <Flex flexDirection="column" gap="sm">
      {variants.map(([variant, label]) => (
        <Flex flexDirection="row" gap="sm" key={variant}>
          {sizes.map((size) => (
            <Chip {...args} key={size} size={size} variant={variant}>
              {label} - {size}
            </Chip>
          ))}
          <Chip disabled {...args} variant={variant}>
            Disabled
          </Chip>
        </Flex>
      ))}
    </Flex>
  ),
};

const sizes = ["sm", "md", "lg"] as const;

const variants = [
  ["solid", "Solid"],
  ["outline", "Outline"],
] as const;

export const Default: Story = {
  ...Variants,
  args: {
    colorScheme: "neutral",
  },
};

export const Primary: Story = {
  ...Variants,
  args: {
    colorScheme: "primary",
  },
};

export const Danger: Story = {
  ...Variants,
  args: {
    colorScheme: "danger",
    onPressedChange: () => {},
  },
};

export const Link: Story = {
  args: {
    asChild: true,
    children: <a href="/">Sample Link</a>,
  },
};

export const StandaloneIcon: Story = {
  render: (args) => (
    <Flex flexDirection="row">
      <Chip {...args} size="sm" startDecorator={<IconChevronDown />} />
      <Chip {...args} size="md" startDecorator={<IconChevronDown />} />
      <Chip {...args} size="lg" startDecorator={<IconChevronDown />} />
    </Flex>
  ),
};
export const Icons: Story = {
  args: {
    children: "Chip",
  },
  render: (args) => (
    <Flex>
      <Flex flexDirection="row">
        <Chip {...args} size="sm" startDecorator={<IconChevronDown />} />
        <Chip {...args} size="md" startDecorator={<IconChevronDown />} />
        <Chip {...args} size="lg" startDecorator={<IconChevronDown />} />
      </Flex>
      <Flex flexDirection="row">
        <Chip {...args} size="sm" startDecorator={<IconChevronDown />} />
        <Chip {...args} size="md" startDecorator={<IconChevronDown />} />
        <Chip {...args} size="lg" startDecorator={<IconChevronDown />} />
      </Flex>
    </Flex>
  ),
};

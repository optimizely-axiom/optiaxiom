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
const appearances = [
  ["default", "Default"],
  ["primary", "Primary"],
  ["danger", "Danger"],
  ["secondary", "Secondary"],
] as const;
const variants = [
  ["solid", "Solid"],
  ["outline", "Outline"],
  ["ghost", "Ghost"],
] as const;

export const Default: Story = {
  ...Variants,
  args: {
    colorScheme: "secondary",
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
  args: { colorScheme: "danger" },
};

export const Secondary: Story = {
  ...Variants,
  args: { colorScheme: "secondary" },
};

export const appearance: Story = {
  render: (args) => (
    <Flex>
      {appearances.map(([appearance, label]) => (
        <Chip {...args} appearance={appearance} key={appearance}>
          {label}
        </Chip>
      ))}
    </Flex>
  ),
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
      <Chip {...args} icon={<IconChevronDown />} size="sm" />
      <Chip {...args} icon={<IconChevronDown />} size="md" />
      <Chip {...args} icon={<IconChevronDown />} size="lg" />
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
        <Chip
          {...args}
          icon={<IconChevronDown />}
          iconPosition="start"
          size="sm"
        />
        <Chip
          {...args}
          icon={<IconChevronDown />}
          iconPosition="start"
          size="md"
        />
        <Chip
          {...args}
          icon={<IconChevronDown />}
          iconPosition="start"
          size="lg"
        />
      </Flex>
      <Flex flexDirection="row">
        <Chip
          {...args}
          icon={<IconChevronDown />}
          iconPosition="end"
          size="sm"
        />
        <Chip
          {...args}
          icon={<IconChevronDown />}
          iconPosition="end"
          size="md"
        />
        <Chip
          {...args}
          icon={<IconChevronDown />}
          iconPosition="end"
          size="lg"
        />
      </Flex>
    </Flex>
  ),
};

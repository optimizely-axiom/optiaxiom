import type { Meta, StoryObj } from "@storybook/react";

import { Avatar, Box, Button, Flex, Indicator } from "@optiaxiom/react";
import { IconBell, IconFilter } from "@tabler/icons-react";

const meta: Meta<typeof Indicator> = {
  component: Indicator,
};

export default meta;
type Story = StoryObj<typeof Indicator>;

const variants = [
  ["subtle", "Subtle"],
  ["solid", "Solid"],
] as const;

const positions = ["top-right", "bottom-right"] as const;

const Variants: Story = {
  render: (args) => (
    <Flex flexDirection="column" gap="sm">
      {variants.map(([variant]) => (
        <Indicator {...args} content="4" key={variant} variant={variant}>
          <Button icon={<IconBell />} size="md" />
        </Indicator>
      ))}
    </Flex>
  ),
};

export const Default: Story = {
  ...Variants,
  args: {},
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
  args: { colorScheme: "information" },
};

export const Success: Story = {
  ...Variants,
  args: { colorScheme: "success" },
};

export const Warning: Story = {
  ...Variants,
  args: { colorScheme: "warning" },
};

export const None: Story = {
  ...Variants,
  args: { colorScheme: "none" },
};

export const AllPositions: Story = {
  args: {
    colorScheme: "information",
    variant: "solid",
  },
  render: (args) => (
    <Flex gap="lg">
      {positions.map((position) => (
        <Box key={position}>
          <Indicator {...args} content="2" position={position}>
            <Button bg="gray.100" icon={<IconFilter />} size="lg" />
          </Indicator>
        </Box>
      ))}
    </Flex>
  ),
};

export const Active: Story = {
  render: (args) => (
    <Flex flexDirection="column">
      <Indicator
        {...args}
        borderColor="gray.100"
        colorScheme="success"
        content=""
        position="top-right"
      >
        <Avatar
          name="John Snow"
          rounded="lg"
          size="lg"
          src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80"
        />
      </Indicator>
    </Flex>
  ),
};

import type { Meta, StoryObj } from "@storybook/react";

import { Avatar, Box, Button, Flex, Indicator } from "@optiaxiom/react";
import { IconBell, IconClockFilled } from "@tabler/icons-react";

export default {
  args: {
    children: <Button icon={<IconBell />} />,
    content: "4",
  },
  component: Indicator,
} as Meta<typeof Indicator>;

type Story = StoryObj<typeof Indicator>;

const colorSchemes = [
  "primary",
  "success",
  "warning",
  "danger",
  "neutral",
  "information",
] as const;

const positions = ["top-right", "bottom-right"] as const;

const Variants: Story = {
  render: (args) => (
    <Flex flexDirection="column" gap="sm">
      {colorSchemes.map((colorScheme) => (
        <Indicator
          {...args}
          colorScheme={colorScheme}
          content="4"
          key={colorScheme}
        />
      ))}
    </Flex>
  ),
};

export const Basic: Story = {};

export const Solid: Story = {
  ...Variants,
  args: {
    variant: "solid",
  },
};

export const Light: Story = {
  ...Variants,
  args: {
    variant: "light",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Position: Story = {
  args: {
    colorScheme: "danger",
    variant: "solid",
  },
  render: (args) => (
    <Flex gap="lg">
      {positions.map((position) => (
        <Box key={position}>
          <Indicator {...args} position={position} />
        </Box>
      ))}
    </Flex>
  ),
};

export const Ping: Story = {
  args: {
    colorScheme: "information",
    content: "",
    ping: true,
    variant: "solid",
  },
};

export const Presence: Story = {
  args: {
    asChild: true,
    children: (
      <Avatar
        name="John Snow"
        src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80"
      />
    ),
    content: (
      <Box asChild bg="neutral.00" color="bg.warning">
        <IconClockFilled size="14" />
      </Box>
    ),
    offset: false,
    position: "bottom-right",
  },
};

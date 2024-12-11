import type { Meta, StoryObj } from "@storybook/react";

import { Avatar, Box, Button, Flex, Indicator } from "@optiaxiom/react";
import { IconBell, IconClockFilled } from "@tabler/icons-react";

export default {
  args: {
    children: <Button aria-label="Notifications" icon={<IconBell />} />,
    content: "4",
  },
  component: Indicator,
} as Meta<typeof Indicator>;

type Story = StoryObj<typeof Indicator>;

const intents = [
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
    <Flex flexDirection="column" gap="12">
      {intents.map((intent) => (
        <Indicator {...args} content="4" intent={intent} key={intent} />
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
    intent: "danger",
    variant: "solid",
  },
  render: (args) => (
    <Flex gap="24">
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
    content: "",
    intent: "information",
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
      <Box asChild bg="fg.default.inverse" color="bg.warning">
        <IconClockFilled size="14" />
      </Box>
    ),
    offset: false,
    position: "bottom-right",
  },
};

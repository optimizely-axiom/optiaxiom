import type { Meta, StoryObj } from "@storybook/react-vite";

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

export const Strong: Story = {
  ...Variants,
  args: {
    variant: "strong",
  },
};

export const Subtle: Story = {
  ...Variants,
  args: {
    variant: "subtle",
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
    variant: "strong",
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
    variant: "strong",
  },
};

export const Presence: Story = {
  args: {
    asChild: true,
    children: (
      <Avatar name="John Snow" src="https://i.pravatar.cc/150?img=10" />
    ),
    content: (
      <Box asChild bg="bg.default" color="fg.warning.light">
        <IconClockFilled size="14" />
      </Box>
    ),
    offset: false,
    position: "bottom-right",
  },
};

import type { Meta, StoryObj } from "@storybook/react";

import { Box, Button, Flex, Indicator } from "@optiaxiom/react";
import { IconBell } from "@tabler/icons-react";

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
  "plain",
] as const;

const alignments = ["start", "end"] as const;

const Variants: Story = {
  render: (args) => (
    <Flex flexDirection="column" gap="sm">
      {colorSchemes.map((colorScheme) => (
        <Indicator
          {...args}
          colorScheme={colorScheme}
          content="4"
          key={colorScheme}
        >
          <Button icon={<IconBell />} />
        </Indicator>
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

export const Align: Story = {
  args: {
    colorScheme: "danger",
    variant: "solid",
  },
  render: (args) => (
    <Flex gap="lg">
      {alignments.map((align) => (
        <Box key={align}>
          <Indicator {...args} align={align} />
        </Box>
      ))}
    </Flex>
  ),
};

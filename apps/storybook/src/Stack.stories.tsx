import type { Meta, StoryObj } from "@storybook/react";

import { Stack, Text } from "@optiaxiom/react";

const meta: Meta<typeof Stack> = {
  component: Stack,
};

export default meta;

type Story = StoryObj<typeof Stack>;

export const Primary: Story = {
  args: {
    children: (
      <>
        <Text background="aqua.50" padding="md">
          Text box 1
        </Text>
        <Text background="aqua.50" padding="md">
          Text box 2
        </Text>
        <Text background="aqua.50" padding="md">
          Text box 3
        </Text>
      </>
    ),
  },
};

export const Horizontal: Story = {
  args: {
    children: (
      <>
        <Text background="aqua.50" padding="md">
          Text box 1
        </Text>
        <Text background="aqua.50" padding="md">
          Text box 2
        </Text>
        <Text background="aqua.50" padding="md">
          Text box 3
        </Text>
      </>
    ),
    direction: "row",
  },
};

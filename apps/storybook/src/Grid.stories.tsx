import type { Meta, StoryObj } from "@storybook/react";

import { Grid, Text } from "@optiaxiom/react";

const meta: Meta<typeof Grid> = {
  component: Grid,
  title: "Primitives / Grid",
};

export default meta;

type Story = StoryObj<typeof Grid>;

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
        <Text background="aqua.50" padding="md">
          Text box 4
        </Text>
        <Text background="aqua.50" padding="md">
          Text box 5
        </Text>
      </>
    ),
    cols: 3,
  },
};

import type { Meta, StoryObj } from "@storybook/react";

import { Grid, Text } from "@optiaxiom/react";

const meta: Meta<typeof Grid> = {
  component: Grid,
};

export default meta;

type Story = StoryObj<typeof Grid>;

export const Primary: Story = {
  args: {
    children: (
      <>
        <Text bg="aqua.50" p="md">
          Text box 1
        </Text>
        <Text bg="aqua.50" p="md">
          Text box 2
        </Text>
        <Text bg="aqua.50" p="md">
          Text box 3
        </Text>
        <Text bg="aqua.50" p="md">
          Text box 4
        </Text>
        <Text bg="aqua.50" p="md">
          Text box 5
        </Text>
      </>
    ),
    cols: "3",
  },
};

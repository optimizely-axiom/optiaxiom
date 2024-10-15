import type { Meta, StoryObj } from "@storybook/react";

import { Grid, Text } from "@optiaxiom/react";

export default {
  component: Grid,
} as Meta<typeof Grid>;

type Story = StoryObj<typeof Grid>;

export const Basic: Story = {
  args: {
    children: (
      <>
        <Text bg="bg.information.subtle" p="md">
          Text box 1
        </Text>
        <Text bg="bg.information.subtle" p="md">
          Text box 2
        </Text>
        <Text bg="bg.information.subtle" p="md">
          Text box 3
        </Text>
        <Text bg="bg.information.subtle" p="md">
          Text box 4
        </Text>
        <Text bg="bg.information.subtle" p="md">
          Text box 5
        </Text>
      </>
    ),
    gridTemplateColumns: "3",
  },
};

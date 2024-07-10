import type { Meta, StoryObj } from "@storybook/react";

import { Flex, Paper, Text } from "@optiaxiom/react";

export default {
  component: Paper,
} as Meta<typeof Paper>;

type Story = StoryObj<typeof Paper>;

export const Primary: Story = {
  args: {
    children: <Text>Hello World!</Text>,
    p: "md",
  },
};

export const Shadows: Story = {
  render: () => (
    <Flex flexDirection="row" gap="xl">
      <Paper p="xl" shadow="xs">
        <Text>Paper with xs shadow</Text>
      </Paper>
      <Paper p="xl" shadow="sm">
        <Text>Paper with sm shadow</Text>
      </Paper>
      <Paper p="xl" shadow="md">
        <Text>Paper with md shadow</Text>
      </Paper>
      <Paper p="xl" shadow="lg">
        <Text>Paper with lg shadow</Text>
      </Paper>
      <Paper p="xl" shadow="xl">
        <Text>Paper with xl shadow</Text>
      </Paper>
    </Flex>
  ),
};

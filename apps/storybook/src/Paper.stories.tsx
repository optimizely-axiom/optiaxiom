import type { Meta, StoryObj } from "@storybook/react";

import { Paper, Stack, Text } from "@optiaxiom/react";

const meta: Meta<typeof Paper> = {
  component: Paper,
  title: "Primitives / Paper",
};

export default meta;

type Story = StoryObj<typeof Paper>;

export const Primary: Story = {
  args: {
    children: <Text>Hello World!</Text>,
    padding: "md",
  },
};

export const Shadows: Story = {
  render: () => (
    <Stack direction="row" gap="xl">
      <Paper padding="xl" shadow="xs">
        <Text>Paper with xs shadow</Text>
      </Paper>
      <Paper padding="xl" shadow="sm">
        <Text>Paper with sm shadow</Text>
      </Paper>
      <Paper padding="xl" shadow="md">
        <Text>Paper with md shadow</Text>
      </Paper>
      <Paper padding="xl" shadow="lg">
        <Text>Paper with lg shadow</Text>
      </Paper>
      <Paper padding="xl" shadow="xl">
        <Text>Paper with xl shadow</Text>
      </Paper>
    </Stack>
  ),
};

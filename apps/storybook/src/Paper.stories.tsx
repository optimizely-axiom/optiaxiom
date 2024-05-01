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
    <Stack flexDirection="row" gap="xl">
      <Paper boxShadow="xs" padding="xl">
        <Text>Paper with xs shadow</Text>
      </Paper>
      <Paper boxShadow="sm" padding="xl">
        <Text>Paper with sm shadow</Text>
      </Paper>
      <Paper boxShadow="md" padding="xl">
        <Text>Paper with md shadow</Text>
      </Paper>
      <Paper boxShadow="lg" padding="xl">
        <Text>Paper with lg shadow</Text>
      </Paper>
      <Paper boxShadow="xl" padding="xl">
        <Text>Paper with xl shadow</Text>
      </Paper>
    </Stack>
  ),
};

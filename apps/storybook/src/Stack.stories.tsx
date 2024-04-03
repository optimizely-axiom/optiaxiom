import type { Meta, StoryObj } from "@storybook/react";

import { Stack, Text } from "@optiaxiom/react";

const meta: Meta<typeof Stack> = {
  component: Stack,
  title: "Primitives / Stack",
};

export default meta;

type Story = StoryObj<typeof Stack>;

const Items = ({ label }: { label?: string }) => (
  <>
    <Text background="aqua.50" padding="md">
      {label ?? "Text box 1"}
    </Text>
    <Text background="aqua.50" padding="md">
      {label ?? "Text box 2"}
    </Text>
    <Text background="aqua.50" padding="md">
      {label ?? "Text box 3"}
    </Text>
  </>
);

export const Primary: Story = {
  args: {
    children: <Items />,
  },
};

export const Horizontal: Story = {
  args: {
    children: <Items />,
    direction: "row",
  },
};

export const Gaps: Story = {
  render: () => (
    <Stack direction="horizontal">
      <Stack gap="xs">
        <Items label="xs" />
      </Stack>
      <Stack gap="sm">
        <Items label="sm" />
      </Stack>
      <Stack gap="md">
        <Items label="md" />
      </Stack>
      <Stack gap="lg">
        <Items label="lg" />
      </Stack>
      <Stack gap="xl">
        <Items label="xl" />
      </Stack>
    </Stack>
  ),
};

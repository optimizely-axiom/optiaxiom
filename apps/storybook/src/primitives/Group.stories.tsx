import type { Meta, StoryObj } from "@storybook/react-vite";

import { Group, Text } from "@optiaxiom/react";

export default {
  args: {
    gap: "16",
  },
  component: Group,
} as Meta<typeof Group>;

type Story = StoryObj<typeof Group>;

const Items = ({ label }: { label?: string }) => (
  <>
    <Text bg="bg.information.subtle" p="16">
      {label ?? "Text box 1"}
    </Text>
    <Text bg="bg.information.subtle" p="16">
      {label ?? "Text box 2"}
    </Text>
    <Text bg="bg.information.subtle" p="16">
      {label ?? "Text box 3"}
    </Text>
  </>
);

export const Basic: Story = {
  args: {
    children: <Items />,
  },
};

export const Vertical: Story = {
  args: {
    children: <Items />,
    flexDirection: "column",
  },
};

export const Gaps: Story = {
  args: {
    children: (
      <>
        <Group flexDirection="column" gap="8">
          <Items label="8" />
        </Group>
        <Group flexDirection="column" gap="12">
          <Items label="12" />
        </Group>
        <Group flexDirection="column" gap="16">
          <Items label="16" />
        </Group>
        <Group flexDirection="column" gap="24">
          <Items label="24" />
        </Group>
        <Group flexDirection="column" gap="32">
          <Items label="32" />
        </Group>
      </>
    ),
  },
};

export const Grow: Story = {
  args: {
    children: (
      <>
        <Text bg="bg.information.subtle" flex="auto" p="16" textAlign="center">
          Item 1
        </Text>
        <Text bg="bg.information.subtle" flex="auto" p="16" textAlign="center">
          Item 2
        </Text>
        <Text bg="bg.information.subtle" flex="auto" p="16" textAlign="center">
          Long Content
        </Text>
      </>
    ),
    flexWrap: "wrap",
    style: { width: "200px" },
  },
};

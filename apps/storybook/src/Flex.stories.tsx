import type { Meta, StoryObj } from "@storybook/react";

import { Flex, Text } from "@optiaxiom/react";

const meta: Meta<typeof Flex> = {
  component: Flex,
  title: "Primitives / Flex",
};

export default meta;

type Story = StoryObj<typeof Flex>;

const Items = ({ label }: { label?: string }) => (
  <>
    <Text bg="aqua.50" p="md">
      {label ?? "Text box 1"}
    </Text>
    <Text bg="aqua.50" p="md">
      {label ?? "Text box 2"}
    </Text>
    <Text bg="aqua.50" p="md">
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
    flexDirection: "row",
  },
};

export const Gaps: Story = {
  render: () => (
    <Flex flexDirection="row">
      <Flex gap="xs">
        <Items label="xs" />
      </Flex>
      <Flex gap="sm">
        <Items label="sm" />
      </Flex>
      <Flex gap="md">
        <Items label="md" />
      </Flex>
      <Flex gap="lg">
        <Items label="lg" />
      </Flex>
      <Flex gap="xl">
        <Items label="xl" />
      </Flex>
    </Flex>
  ),
};

export const Grow: Story = {
  args: {
    children: (
      <>
        <Text bg="aqua.50" grow="1" p="md" textAlign="center">
          Item 1
        </Text>
        <Text bg="aqua.50" grow="1" p="md" textAlign="center">
          Item 2
        </Text>
        <Text bg="aqua.50" grow="1" p="md" textAlign="center">
          Long Content
        </Text>
      </>
    ),
    flexDirection: "row",
    flexWrap: "wrap",
    style: { width: "200px" },
  },
};

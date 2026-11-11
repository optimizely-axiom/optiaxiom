import type { Meta, StoryObj } from "@storybook/react-vite";

import { Box, Flex, Text } from "@optiaxiom/react";
import { expect } from "storybook/test";

export default {
  component: Flex,
} as Meta<typeof Flex>;

type Story = StoryObj<typeof Flex>;

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

export const Horizontal: Story = {
  args: {
    children: <Items />,
    flexDirection: "row",
  },
};

export const Gaps: Story = {
  render: () => (
    <Flex flexDirection="row">
      <Flex gap="8">
        <Items label="8" />
      </Flex>
      <Flex gap="12">
        <Items label="12" />
      </Flex>
      <Flex gap="16">
        <Items label="16" />
      </Flex>
      <Flex gap="24">
        <Items label="24" />
      </Flex>
      <Flex gap="32">
        <Items label="32" />
      </Flex>
    </Flex>
  ),
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
    flexDirection: "row",
    flexWrap: "wrap",
    style: { width: "200px" },
  },
};

export const ScrollInNestedColumn: Story = {
  args: {
    border: "1",
    children: (
      <>
        <Text fontWeight="600">Assets</Text>
        <Flex flex="1" minH="0">
          <Box aria-label="Assets" overflow="auto" role="region" tabIndex={0}>
            {Array.from({ length: 20 }, (_, i) => (
              <Text key={i} py="4">
                Asset {i + 1}
              </Text>
            ))}
          </Box>
        </Flex>
      </>
    ),
    h: "224",
    p: "16",
    w: "224",
  },
  play: async ({ canvas }) => {
    const list = canvas.getByRole("region", { name: "Assets" });
    await expect(list.scrollHeight).toBeGreaterThan(list.clientHeight);
  },
};

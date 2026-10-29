import type { Meta, StoryObj } from "@storybook/react-vite";

import { Avatar, Box, Group, Text } from "@optiaxiom/react";
import { expect } from "storybook/test";

export default {
  component: Text,
} as Meta<typeof Text>;

type Story = StoryObj<typeof Text>;

export const Basic: Story = {
  args: {
    children: "Lorem ipsum",
  },
};

export const LineClamp: Story = {
  args: {
    children: (
      <>
        Lorem Ipsum is a placeholder text commonly used in the design and
        printing industries. Despite its widespread use, the origins of Lorem
        Ipsum are somewhat mysterious. Several theories exist about who may have
        invented the text, but no one knows.
      </>
    ),
    lineClamp: "2",
    w: "224",
  },
};

export const Sizes: Story = {
  render: () => (
    <>
      <Text fontSize="xs">This is xs size text</Text>
      <Text fontSize="sm">This is sm size text</Text>
      <Text fontSize="md">This is md size text</Text>
      <Text fontSize="lg">This is lg size text</Text>
      <Text fontSize="xl">This is xl size text</Text>
    </>
  ),
};

export const Truncate: Story = {
  args: {
    children: "The quick brown fox jumps over the lazy dog.",
    truncate: true,
    w: "224",
  },
};

export const TruncateInFlexRow: Story = {
  args: {
    children: "The quick brown fox jumps over the lazy dog.",
    truncate: true,
  },
  play: async ({ canvas }) => {
    const text = canvas.getByText(/quick brown fox/);
    await expect(text.scrollWidth).toBeGreaterThan(text.clientWidth);
  },
  render: (args) => (
    <Group gap="8" w="224">
      <Avatar name="Ada Lovelace" />
      <Box minW="0">
        <Text {...args} />
      </Box>
    </Group>
  ),
};

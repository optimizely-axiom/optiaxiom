import type { Meta, StoryObj } from "@storybook/react";

import { Text } from "@optiaxiom/react";

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

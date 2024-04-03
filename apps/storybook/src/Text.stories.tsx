import type { Meta, StoryObj } from "@storybook/react";

import { Text } from "@optiaxiom/react";

const meta: Meta<typeof Text> = {
  component: Text,
  title: "Typography / Text",
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Primary: Story = {
  args: {
    children: "Lorem ipsum",
  },
};

export const Sizes: Story = {
  render: () => (
    <>
      <Text size="xs">This is xs size text</Text>
      <Text size="sm">This is sm size text</Text>
      <Text size="md">This is md size text</Text>
      <Text size="lg">This is lg size text</Text>
      <Text size="xl">This is xl size text</Text>
    </>
  ),
};

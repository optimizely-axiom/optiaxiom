import type { Meta, StoryObj } from "@storybook/react-vite";

import { Group, Separator, Text } from "@optiaxiom/react";

export default {
  component: Separator,
} as Meta<typeof Separator>;

type Story = StoryObj<typeof Separator>;

export const Basic: Story = {
  args: {
    my: "12",
    orientation: "horizontal",
  },

  render: (args) => {
    return (
      <Group flexDirection="column" gap="0">
        <Text>First Item</Text>
        <Separator {...args} />
        <Text>Second Item</Text>
      </Group>
    );
  },
};

export const Vertical: Story = {
  args: {
    mx: "12",
    orientation: "vertical",
  },

  render: (args) => {
    return (
      <Group gap="0">
        <Text>First Item</Text>
        <Separator {...args} />
        <Text>Second Item</Text>
      </Group>
    );
  },
};

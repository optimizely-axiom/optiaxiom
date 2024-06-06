import type { Meta, StoryObj } from "@storybook/react";

import { Flex, Separator, Text } from "@optiaxiom/react";

const meta: Meta<typeof Separator> = {
  component: Separator,
};

export default meta;

type Story = StoryObj<typeof Separator>;

export const Primary: Story = {
  args: {
    orientation: "horizontal",
  },

  render: (args) => {
    return (
      <Flex flexDirection="column" gap="0">
        <Text>First Item</Text>
        <Separator {...args} />
        <Text>Second Item</Text>
      </Flex>
    );
  },
};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
  },

  render: (args) => {
    return (
      <Flex flexDirection="row" gap="0">
        <Text>First Item</Text>
        <Separator {...args} />
        <Text>Second Item</Text>
      </Flex>
    );
  },
};

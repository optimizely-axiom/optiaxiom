import type { Meta, StoryObj } from "@storybook/react";

import { Flex, Spinner } from "@optiaxiom/react";

export default {
  component: Spinner,
} as Meta<typeof Spinner>;

type Story = StoryObj<typeof Spinner>;

export const Basic: Story = {};

export const Colors: Story = {
  render: (args) => (
    <Flex flexDirection="row">
      <Spinner {...args} colorScheme="default" />
      <Spinner {...args} colorScheme="inverse" />
    </Flex>
  ),
};

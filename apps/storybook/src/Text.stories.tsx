import type { Meta, StoryObj } from "@storybook/react";

import { Text } from "@optimizely-axiom/react";

const meta: Meta<typeof Text> = {
  component: Text,
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Primary: Story = {
  args: {
    children: "Lorem ipsum",
  },
};

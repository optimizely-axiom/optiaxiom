import type { Meta, StoryObj } from "@storybook/react";

import { Heading } from "@optimizely-axiom/react";

const meta: Meta<typeof Heading> = {
  component: Heading,
};

export default meta;

type Story = StoryObj<typeof Heading>;

export const Primary: Story = {
  args: {
    children: "Lorem ipsum",
  },
};

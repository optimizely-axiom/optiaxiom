import type { Meta, StoryObj } from "@storybook/react";

import { ProgressBar } from "@optiaxiom/react";

const meta: Meta<typeof ProgressBar> = {
  component: ProgressBar,
  title: "Primitives / ProgressBar",
};

export default meta;

type Story = StoryObj<typeof ProgressBar>;

export const Primary: Story = {
  args: {
    max: 60,
    value: 30,
  },
};

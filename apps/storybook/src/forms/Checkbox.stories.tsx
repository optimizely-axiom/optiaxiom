import type { Meta, StoryObj } from "@storybook/react";

import { Checkbox } from "@optiaxiom/react";

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Basic: Story = {
  args: {
    indeterminate: true,
    label: "Test",
  },
};

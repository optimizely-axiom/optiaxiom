import type { Meta, StoryObj } from "@storybook/react";

import { CheckboxGroup } from "@optiaxiom/react";

const meta: Meta<typeof CheckboxGroup> = {
  component: CheckboxGroup,
};

export default meta;

type Story = StoryObj<typeof CheckboxGroup>;

export const Basic: Story = {
  args: {
    label: "Test",
  },
};

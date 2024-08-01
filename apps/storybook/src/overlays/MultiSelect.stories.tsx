import type { Meta, StoryObj } from "@storybook/react";

import { MultiSelectCombobox } from "@optiaxiom/react";

const meta: Meta<typeof MultiSelectCombobox> = {
  component: MultiSelectCombobox,
};

export default meta;

type Story = StoryObj<typeof MultiSelectCombobox>;

export const Basic: Story = {};

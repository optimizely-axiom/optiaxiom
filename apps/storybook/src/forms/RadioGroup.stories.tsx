import type { Meta, StoryObj } from "@storybook/react";

import { RadioGroup } from "@optiaxiom/react";

const meta: Meta<typeof RadioGroup> = {
  component: RadioGroup,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof RadioGroup>;

const options = [
  {
    description: "desc-1",
    label: "Sample 1",
    value: "sample-1",
  },
  { label: "Sample 2", value: "sample-2" },
  { description: "desc-3", label: "Sample 3", value: "sample-3" },
];

export const Basic: Story = {
  args: {
    defaultValue: options[0].value,
    options: options,
  },
};

export const Disabled: Story = {
  args: {
    alignItems: "start",
    defaultValue: options[0].value,
    disabled: true,
    flexDirection: "row",
    options: options,
  },
};

export const SingleDisabled: Story = {
  args: {
    defaultValue: options[0].value,
    options: [
      ...options,
      {
        description: "desc-4",
        disabled: true,
        label: "Sample 4",
        value: "sample-4",
      },
    ],
  },
};

export const Readonly: Story = {
  args: {
    defaultValue: options[0].value,
    options: options,
    readonly: true,
  },
};

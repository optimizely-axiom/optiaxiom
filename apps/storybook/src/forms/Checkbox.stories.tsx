import type { Meta, StoryObj } from "@storybook/react";

import { Checkbox, Flex } from "@optiaxiom/react";

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Basic: Story = {
  args: {
    label: "Test",
  },
};
export const HelperText: Story = {
  args: {
    helperText: "Helper Text",
    label: "Test",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    helperText: "Helper Text",
    label: "Label",
  },
};
export const Readonly: Story = {
  args: {
    helperText: "Helper Text",
    label: "Label",
    readonly: true,
  },
};

export const States: Story = {
  args: {
    label: "Label",
  },
  render: () => (
    <Flex flexDirection="column">
      <Checkbox checked={false} label="Unchecked" />
      <Checkbox checked label="Checked" />
      <Checkbox checked="indeterminate" label=" Checked (Indeterminate)" />
      <Checkbox disabled label="Unchecked (Disabled)" />
      <Checkbox checked disabled label="Checked (Disabled)" />
      <Checkbox
        defaultChecked="indeterminate"
        disabled
        label="Checked (Disabled,Indeterminate)"
      />
      <Checkbox label="Unchecked (Read-Only)" readonly />
      <Checkbox checked label="Checked (Read-Only)" readonly />

      <Checkbox
        checked="indeterminate"
        label="Checked (Read-Only,Indeterminate)"
        readonly
      />
    </Flex>
  ),
};

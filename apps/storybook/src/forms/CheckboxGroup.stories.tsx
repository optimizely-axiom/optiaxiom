import type { Meta, StoryObj } from "@storybook/react";

import { CheckboxGroup } from "@optiaxiom/react";

const meta: Meta<typeof CheckboxGroup> = {
  component: CheckboxGroup,
  title: "CheckboxGroup",
};

export default meta;

type Story = StoryObj<typeof CheckboxGroup>;

export const Basic: Story = {
  args: {
    checkboxItems: [
      { id: "item1", label: "Item 1" },
      { id: "item2", label: "Item 2" },
      { id: "item3", label: "Item 3" },
    ],
    label: "Select All",
  },
};

export const WithHelperText: Story = {
  args: {
    checkboxItems: [
      { helperText: "Helper Text 1", id: "item1", label: "Item 1" },
      { helperText: "Helper Text 2", id: "item2", label: "Item 2" },
      { helperText: "Helper Text 3", id: "item3", label: "Item 3" },
    ],
    helperText: "This is a helper text",
    label: "Select All",
  },
};

export const Disabled: Story = {
  args: {
    checkboxItems: [
      { id: "item1", label: "Item 1" },
      { id: "item2", label: "Item 2" },
      { id: "item3", label: "Item 3" },
    ],
    disabled: true,
    label: "Select All",
  },
};

export const Readonly: Story = {
  args: {
    checkboxItems: [
      { id: "item1", label: "Item 1" },
      { id: "item2", label: "Item 2" },
      { id: "item3", label: "Item 3" },
    ],
    label: "Select All",
    readonly: true,
  },
};

export const MixedStates: Story = {
  args: {
    checkboxItems: [
      { defaultChecked: true, id: "item1", label: "Item 1" },
      { id: "item2", label: "Item 2" },
      { defaultChecked: "indeterminate", id: "item3", label: "Item 3" },
    ],
    label: "Select All",
  },
};

import type { Meta, StoryObj } from "@storybook/react";

import { Checkbox, Flex, Text } from "@optiaxiom/react";

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Basic: Story = {
  args: {
    label: <Text>Label</Text>,
  },
};
export const HelperText: Story = {
  args: {
    label: (
      <Text>
        Label
        <Text as="p" color="fg.secondary" fontSize="sm">
          Helper Text
        </Text>
      </Text>
    ),
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: (
      <Text>
        Label
        <Text as="p" fontSize="sm">
          Helper Text
        </Text>
      </Text>
    ),
  },
};
export const Readonly: Story = {
  args: {
    label: (
      <Text>
        Label
        <Text as="p" color="fg.secondary" fontSize="sm">
          Helper Text
        </Text>
      </Text>
    ),
    readonly: true,
  },
};

export const States: Story = {
  args: {
    label: <Text>Label</Text>,
  },
  render: () => (
    <Flex flexDirection="column">
      <Checkbox checked={false} label={<Text>Unchecked</Text>} />
      <Checkbox checked label={<Text>Checked</Text>} />
      <Checkbox
        checked="indeterminate"
        label={<Text>Checked (Indeterminate)</Text>}
      />
      <Checkbox disabled label={<Text>Unchecked (Disabled)</Text>} />
      <Checkbox checked disabled label={<Text>Checked (Disabled)</Text>} />
      <Checkbox
        defaultChecked="indeterminate"
        disabled
        label={<Text>Checked (Disabled,Indeterminate)</Text>}
      />
      <Checkbox label={<Text>Unchecked (Read-Only)</Text>} readonly />
      <Checkbox checked label={<Text>Checked (Read-Only)</Text>} readonly />

      <Checkbox
        checked="indeterminate"
        label={<Text>Checked (Read-Only,Indeterminate)</Text>}
        readonly
      />
    </Flex>
  ),
};

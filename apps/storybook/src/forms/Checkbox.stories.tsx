import type { Meta, StoryObj } from "@storybook/react";

import { Checkbox, Flex, Text } from "@optiaxiom/react";

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Basic: Story = {
  args: {
    children: "Label",
  },
};
export const HelperText: Story = {
  args: {
    children: (
      <>
        Label
        <Text as="p" color="fg.secondary" fontSize="sm">
          Helper Text
        </Text>
      </>
    ),
  },
};

export const Disabled: Story = {
  args: {
    children: (
      <>
        Label
        <Text as="p" color="fg.secondary" fontSize="sm">
          Helper Text
        </Text>
      </>
    ),
    disabled: true,
  },
};
export const Readonly: Story = {
  args: {
    children: (
      <>
        Label
        <Text as="p" color="fg.secondary" fontSize="sm">
          Helper Text
        </Text>
      </>
    ),
    readonly: true,
  },
};

export const States: Story = {
  args: {
    children: <Text>Label</Text>,
  },
  render: () => (
    <Flex flexDirection="column">
      <Checkbox checked={false}>
        <Text>Unchecked</Text>
      </Checkbox>
      <Checkbox checked>
        <Text>Checked</Text>
      </Checkbox>
      <Checkbox checked="indeterminate">
        <Text>Checked (Indeterminate)</Text>
      </Checkbox>

      <Checkbox disabled>
        <Text>Unchecked (Disabled)</Text>
      </Checkbox>
      <Checkbox checked disabled>
        <Text>Checked (Disabled)</Text>
      </Checkbox>
      <Checkbox defaultChecked="indeterminate" disabled>
        <Text>Checked (Disabled,Indeterminate)</Text>
      </Checkbox>
      <Checkbox readonly>
        <Text>Unchecked (Read-Only)</Text>
      </Checkbox>
      <Checkbox checked readonly>
        <Text>Checked (Read-Only)</Text>
      </Checkbox>

      <Checkbox checked="indeterminate" readonly>
        <Text>Checked (Read-Only,Indeterminate)</Text>
      </Checkbox>
    </Flex>
  ),
};

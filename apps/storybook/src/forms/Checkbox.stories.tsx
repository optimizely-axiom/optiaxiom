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
    children: "Label",
    endDecorator: (
      <Text color="fg.secondary" fontSize="sm">
        Helper Text
      </Text>
    ),
  },
};

export const MultiLineLabel: Story = {
  args: {
    children: "Label",
    endDecorator: (
      <Text color="fg.secondary" fontSize="sm">
        Helper Text
      </Text>
    ),
  },
  render: (args) => (
    <Flex w="208">
      <Checkbox {...args} />
      <Checkbox {...args}>This is an example of a multi line label</Checkbox>
    </Flex>
  ),
};

export const Disabled: Story = {
  args: {
    children: "Label",
    disabled: true,
  },
};

export const Intermediate: Story = {
  args: {
    checked: "indeterminate",
    children: "Label",
  },
};

export const States: Story = {
  args: {
    children: <Text>Label</Text>,
  },
  render: () => (
    <Flex flexDirection="row">
      <Flex>
        <Checkbox checked={false}>Unchecked</Checkbox>
        <Checkbox checked>Checked</Checkbox>
        <Checkbox checked="indeterminate">Checked (Indeterminate)</Checkbox>
      </Flex>

      <Flex>
        <Checkbox disabled>Unchecked (Disabled)</Checkbox>
        <Checkbox checked disabled>
          Checked (Disabled)
        </Checkbox>
        <Checkbox defaultChecked="indeterminate" disabled>
          Checked (Disabled, Indeterminate)
        </Checkbox>
      </Flex>
    </Flex>
  ),
};

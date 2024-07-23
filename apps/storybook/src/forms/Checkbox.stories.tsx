import type { Meta, StoryObj } from "@storybook/react";

import { Checkbox, Flex, Text } from "@optiaxiom/react";

export default {
  args: {
    children: "Label",
  },
  component: Checkbox,
} as Meta<typeof Checkbox>;

type Story = StoryObj<typeof Checkbox>;

export const Basic: Story = {};

export const HelperText: Story = {
  args: {
    endDecorator: (
      <Text color="fg.secondary" fontSize="sm">
        Helper Text
      </Text>
    ),
  },
};

export const MultiLineLabel: Story = {
  render: (args) => (
    <Flex w="208">
      <Checkbox {...args} />
      <Checkbox {...args}>This is an example of a multi line label</Checkbox>
    </Flex>
  ),
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
  render: (args) => (
    <Flex>
      <Checkbox {...args} />
      <Checkbox {...args} disabled />
    </Flex>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <Flex>
      <Checkbox {...args} defaultChecked />
      <Checkbox {...args} />
    </Flex>
  ),
};

export const Intermediate: Story = {
  args: {
    checked: "indeterminate",
  },
  render: (args) => (
    <Flex>
      <Checkbox {...args} />
      <Checkbox {...args} disabled />
    </Flex>
  ),
};

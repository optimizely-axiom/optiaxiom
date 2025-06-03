import type { Meta, StoryObj } from "@storybook/react-vite";

import { Checkbox, Flex } from "@optiaxiom/react";

export default {
  args: {
    children: "Label",
  },
  component: Checkbox,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/qs72V79n1s9wYOcZ1TzBwM/Components-V2?node-id=99:1127",
    },
  },
} as Meta<typeof Checkbox>;

type Story = StoryObj<typeof Checkbox>;

export const Basic: Story = {};

export const HelperText: Story = {
  args: {
    description: "Helper Text",
  },
};

export const MultiLineLabel: Story = {
  render: (args) => (
    <Flex w="224">
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
    checked: true,
    indeterminate: true,
  },
  render: (args) => (
    <Flex>
      <Checkbox {...args} />
      <Checkbox {...args} disabled />
    </Flex>
  ),
};

export const VerticalAlignment: Story = {
  render: (args) => (
    <Flex flexDirection="row">
      <Flex border="1">
        <Checkbox alignItems="center" h="xl" {...args} />
      </Flex>
      <Flex border="1">
        <Checkbox alignItems="center" h="xl" {...args}>
          {null}
        </Checkbox>
      </Flex>
    </Flex>
  ),
};

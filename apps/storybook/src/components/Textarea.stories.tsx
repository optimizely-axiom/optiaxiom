import type { Meta, StoryObj } from "@storybook/react";

import { Flex, Text, Textarea } from "@optiaxiom/react";

export default {
  component: Textarea,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/qs72V79n1s9wYOcZ1TzBwM/Components-V2?node-id=679:6927",
    },
  },
} as Meta<typeof Textarea>;

type Story = StoryObj<typeof Textarea>;

export const Basic: Story = {
  args: {
    placeholder: "Enter text....",
  },
};

export const Value: Story = {
  args: {
    defaultValue: "Some user input value",
  },
};

export const ManualResize: Story = {
  args: {
    placeholder: "Enter text....",
    resize: "vertical",
  },
};

export const AutoSize: Story = {
  args: {
    placeholder: "Enter text....",
    resize: "auto",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <Flex>
      <Textarea {...args} placeholder="Disabled placeholder..." />
      <Textarea {...args} defaultValue="Disabled with value" />
    </Flex>
  ),
};

export const Readonly: Story = {
  args: {
    readOnly: true,
  },
  render: (args) => (
    <Flex>
      <Textarea {...args} placeholder="Readonly placeholder..." />
      <Textarea {...args} defaultValue="Readonly with value" />
    </Flex>
  ),
};

export const Error: Story = {
  args: {
    error: true,
  },
  render: (args) => (
    <Flex>
      <Textarea {...args} placeholder="Error placeholder..." />
      <Textarea {...args} defaultValue="Error with value" />
    </Flex>
  ),
};

export const Addons: Story = {
  args: {
    placeholder: "Enter text....",
  },
  render: (args) => (
    <Flex>
      <Textarea {...args} addonBefore={<Text>Top Section</Text>} />
      <Textarea {...args} addonAfter={<Text>Bottom Section</Text>} />
    </Flex>
  ),
};

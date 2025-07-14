import type { Meta, StoryObj } from "@storybook/react-vite";

import { Flex, Text, Textarea } from "@optiaxiom/react";

export default {
  args: {
    placeholder: "Enter text....",
  },
  component: Textarea,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/qs72V79n1s9wYOcZ1TzBwM/Components-V2?node-id=679:6927",
    },
  },
} as Meta<typeof Textarea>;

type Story = StoryObj<typeof Textarea>;

export const Basic: Story = {};

export const Value: Story = {
  args: {
    defaultValue: "Some user input value",
  },
};

export const ManualResize: Story = {
  args: {
    defaultValue:
      "Lorem Ipsum is a placeholder text commonly used in the design and printing industries.\nDespite its widespread use, the origins of Lorem Ipsum are somewhat mysterious. Several theories exist about who may have invented the text, but no one knows.",
    resize: "vertical",
  },
  render: (args) => (
    <Flex maxW="xs">
      <Textarea {...args} />
      <Textarea {...args} resize="none" />
    </Flex>
  ),
};

export const AutoSize: Story = {
  args: {
    defaultValue:
      "Lorem Ipsum is a placeholder text commonly used in the design and printing industries.\nDespite its widespread use, the origins of Lorem Ipsum are somewhat mysterious. Several theories exist about who may have invented the text, but no one knows.",
    resize: "auto",
  },
  render: (args) => (
    <Flex maxW="xs">
      <Textarea {...args} />
      <Textarea {...args} maxRows={2} />
    </Flex>
  ),
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
  render: (args) => (
    <Flex>
      <Textarea {...args} addonBefore={<Text>Top Section</Text>} />
      <Textarea {...args} addonAfter={<Text>Bottom Section</Text>} />
    </Flex>
  ),
};

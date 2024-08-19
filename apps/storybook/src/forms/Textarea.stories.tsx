import type { Meta, StoryObj } from "@storybook/react";

import { Field, Flex, Text, Textarea } from "@optiaxiom/react";

export default {
  component: Textarea,
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

export const Decorators: Story = {
  args: {
    placeholder: "Enter text....",
  },
  render: (args) => (
    <Flex>
      <Textarea {...args} startDecorator={<Text>Top Section</Text>} />
      <Textarea {...args} endDecorator={<Text>Bottom Section</Text>} />
    </Flex>
  ),
};

export const WrappingWithField: Story = {
  args: {
    defaultValue: "Some user input value",
  },
  render: (args) => (
    <Field info="This is an important textarea" label="Form Label" required>
      <Textarea {...args} />
    </Field>
  ),
};

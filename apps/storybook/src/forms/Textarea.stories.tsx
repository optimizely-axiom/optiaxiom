import type { Meta, StoryObj } from "@storybook/react";

import { Flex, Text, Textarea } from "@optiaxiom/react";

const meta: Meta<typeof Textarea> = {
  component: Textarea,
};

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    placeholder: "Enter text....",
  },
};

export const NoResize: Story = {
  args: {
    placeholder: "Enter text....",
    resize: "none",
  },
};

export const WithTopSection: Story = {
  args: {
    placeholder: "Enter text....",
    topSection: <Text>Top Section</Text>,
  },
};

export const WithBottomSection: Story = {
  args: {
    bottomSection: <Text>Bottom Section</Text>,
    placeholder: "Enter text....",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <Flex>
      <Textarea {...args} defaultValue="Disabled with value" />
      <Textarea {...args} placeholder="Disabled placeholder" />
    </Flex>
  ),
};

export const Readonly: Story = {
  args: {
    readOnly: true,
  },
  render: (args) => (
    <Flex>
      <Textarea {...args} defaultValue="Readonly with value" />
      <Textarea {...args} placeholder="Readonly placeholder" />
    </Flex>
  ),
};
export const Error: Story = {
  args: {
    error: true,
  },
  render: (args) => (
    <Flex>
      <Textarea {...args} defaultValue="Error with value" />
      <Textarea {...args} placeholder="Error placeholder" />
    </Flex>
  ),
};

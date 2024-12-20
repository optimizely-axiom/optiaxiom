import type { Meta, StoryObj } from "@storybook/react";

import { Flex, Input } from "@optiaxiom/react";
import { IconCalendar } from "@tabler/icons-react";

export default {
  component: Input,
} as Meta<typeof Input>;

type Story = StoryObj<typeof Input>;

export const Basic: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const Value: Story = {
  args: {
    defaultValue: "Some user input value",
  },
};

export const Sizes: Story = {
  args: {
    placeholder: "Enter text...",
  },
  render: (args) => (
    <Flex>
      <Input {...args} size="md" />
      <Input {...args} size="lg" />
    </Flex>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <Flex>
      <Input {...args} placeholder="Disabled placeholder..." />
      <Input {...args} defaultValue="Disabled with value" />
    </Flex>
  ),
};

export const Readonly: Story = {
  args: {
    readOnly: true,
  },
  render: (args) => (
    <Flex>
      <Input {...args} placeholder="Readonly placeholder..." />
      <Input {...args} defaultValue="Readonly with value" />
    </Flex>
  ),
};

export const Error: Story = {
  args: {
    error: true,
  },
  render: (args) => (
    <Flex>
      <Input {...args} placeholder="Error placeholder..." />
      <Input {...args} defaultValue="Error with value" />
    </Flex>
  ),
};

export const Addons: Story = {
  render: (args) => (
    <Flex>
      <Input
        {...args}
        addonBefore={<IconCalendar size="20" />}
        placeholder="With left Icon"
      />
      <Input
        {...args}
        addonAfter={<IconCalendar size="20" />}
        placeholder="With right Icon"
      />
      <Input
        {...args}
        addonAfter={<IconCalendar size="20" />}
        addonBefore={<IconCalendar size="20" />}
        placeholder="With both Icon"
      />
    </Flex>
  ),
};

export const NumberInput: Story = {
  render: () => (
    <Flex>
      <Input appearance="number" defaultValue="20.00" placeholder="00.00" />
      <Input appearance="number" placeholder="00.00" />
      <Input appearance="number" disabled placeholder="00.00" />
      <Input appearance="number" defaultValue="20.00" error />
    </Flex>
  ),
};

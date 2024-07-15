import type { Meta, StoryObj } from "@storybook/react";

import { Flex, Input } from "@optiaxiom/react";
import { IconCalendar } from "@tabler/icons-react";

export default {
  component: Input,
} as Meta<typeof Input>;

type Story = StoryObj<typeof Input>;

export const Primary: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const Sizes: Story = {
  args: {
    placeholder: "Enter text...",
  },
  render: (args) => (
    <Flex>
      <Input {...args} size="sm" />
      <Input {...args} size="md" />
      <Input {...args} size="lg" />
    </Flex>
  ),
};

export const Value: Story = {
  args: {
    defaultValue: "Regular value",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Disabled placeholder",
  },
};

export const DisabledValue: Story = {
  args: {
    defaultValue: "Disabled value",
    disabled: true,
  },
};

export const Error: Story = {
  args: {
    error: true,
    placeholder: "Required field...",
  },
};

export const ErrorValue: Story = {
  args: {
    defaultValue: "Error value",
    error: true,
  },
};

export const Decorators: Story = {
  render: (args) => (
    <Flex>
      <Input
        {...args}
        placeholder="With left Icon"
        startDecorator={<IconCalendar size="20" />}
      />
      <Input
        {...args}
        endDecorator={<IconCalendar size="20" />}
        placeholder="With right Icon"
      />
      <Input
        {...args}
        endDecorator={<IconCalendar size="20" />}
        placeholder="With both Icon"
        startDecorator={<IconCalendar size="20" />}
      />
    </Flex>
  ),
};

export const NumberInput: Story = {
  render: () => (
    <Flex>
      <Input defaultValue="20.00" placeholder="00.00" variant="number" />
      <Input placeholder="00.00" variant="number" />
      <Input disabled placeholder="00.00" variant="number" />
      <Input defaultValue="20.00" error variant="number" />
    </Flex>
  ),
};

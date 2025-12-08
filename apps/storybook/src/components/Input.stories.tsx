import type { Meta, StoryObj } from "@storybook/react-vite";

import { Group, Input } from "@optiaxiom/react";
import { IconCalendar } from "@tabler/icons-react";

export default {
  args: {
    placeholder: "Enter text...",
  },
  component: Input,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/qs72V79n1s9wYOcZ1TzBwM/Components-V2?node-id=20%3A2741",
    },
  },
} as Meta<typeof Input>;

type Story = StoryObj<typeof Input>;

export const Basic: Story = {};

export const Value: Story = {
  args: {
    defaultValue: "Some user input value",
  },
};

export const Sizes: Story = {
  render: (args) => (
    <Group flexDirection="column" gap="16">
      <Input {...args} size="md" />
      <Input {...args} size="lg" />
    </Group>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <Group flexDirection="column" gap="16">
      <Input {...args} placeholder="Disabled placeholder..." />
      <Input {...args} defaultValue="Disabled with value" />
    </Group>
  ),
};

export const Readonly: Story = {
  args: {
    readOnly: true,
  },
  render: (args) => (
    <Group flexDirection="column" gap="16">
      <Input {...args} placeholder="Readonly placeholder..." />
      <Input {...args} defaultValue="Readonly with value" />
    </Group>
  ),
};

export const Error: Story = {
  args: {
    error: true,
  },
  render: (args) => (
    <Group flexDirection="column" gap="16">
      <Input {...args} placeholder="Error placeholder..." />
      <Input {...args} defaultValue="Error with value" />
    </Group>
  ),
};

export const Addons: Story = {
  render: (args) => (
    <Group flexDirection="column" gap="16">
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
    </Group>
  ),
};

export const NumberInput: Story = {
  render: (args) => (
    <Group flexDirection="column" gap="16">
      <Input
        {...args}
        appearance="number"
        defaultValue="20.00"
        placeholder="00.00"
      />
      <Input {...args} appearance="number" placeholder="00.00" />
      <Input {...args} appearance="number" disabled placeholder="00.00" />
      <Input {...args} appearance="number" defaultValue="20.00" error />
    </Group>
  ),
};

export const Types: Story = {
  render: (args) => (
    <Group flexDirection="column" gap="16">
      <Input {...args} type="date" />
      <Input {...args} type="file" />
      <Input {...args} defaultValue="query" type="password" />
      <Input {...args} autoFocus defaultValue="query" type="search" />
      <Input {...args} defaultValue="query" type="text" />
      <Input {...args} type="time" />
    </Group>
  ),
};

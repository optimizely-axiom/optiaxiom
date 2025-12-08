import type { Meta, StoryObj } from "@storybook/react-vite";

import { Checkbox, Group } from "@optiaxiom/react";

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
    <Group flexDirection="column" gap="16" w="224">
      <Checkbox {...args} />
      <Checkbox {...args}>This is an example of a multi line label</Checkbox>
    </Group>
  ),
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
  render: (args) => (
    <Group flexDirection="column" gap="16">
      <Checkbox {...args} />
      <Checkbox {...args} disabled />
    </Group>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <Group flexDirection="column" gap="16">
      <Checkbox {...args} defaultChecked />
      <Checkbox {...args} />
    </Group>
  ),
};

export const Intermediate: Story = {
  args: {
    checked: true,
    indeterminate: true,
  },
  render: (args) => (
    <Group flexDirection="column" gap="16">
      <Checkbox {...args} />
      <Checkbox {...args} disabled />
    </Group>
  ),
};

export const VerticalAlignment: Story = {
  render: (args) => (
    <Group gap="16">
      <Group border="1" flexDirection="column" gap="16">
        <Checkbox alignItems="center" h="xl" {...args} />
      </Group>
      <Group border="1" flexDirection="column" gap="16">
        <Checkbox alignItems="center" aria-label="Label" h="xl" {...args}>
          {null}
        </Checkbox>
      </Group>
    </Group>
  ),
};

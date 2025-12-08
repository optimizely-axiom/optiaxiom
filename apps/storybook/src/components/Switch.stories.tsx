import type { Meta, StoryObj } from "@storybook/react-vite";

import { Group, Switch, Text, Tooltip } from "@optiaxiom/react";

export default {
  args: {
    children: "Label",
  },
  component: Switch,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/qs72V79n1s9wYOcZ1TzBwM/Components-V2?node-id=293:3346",
    },
  },
} as Meta<typeof Switch>;

type Story = StoryObj<typeof Switch>;

export const Basic: Story = {};

export const Large: Story = {
  args: {
    size: "lg",
  },
};

export const MultiLineLabel: Story = {
  render: (args) => (
    <Group flexDirection="column" gap="16" w="224">
      <Switch {...args} />
      <Switch {...args}>This is a medium example of a multi line label</Switch>
      <Switch {...args} size="lg">
        This is a large example of a multi line label
      </Switch>
    </Group>
  ),
};

export const WithTooltip: Story = {
  render: (args) => (
    <Group flexDirection="column" gap="16" w="224">
      <Switch {...args} />
      <Switch {...args}>
        <Tooltip auto content="This is a medium example of a multi line label">
          <Text truncate>This is a medium example of a multi line label</Text>
        </Tooltip>
      </Switch>
      <Switch {...args} size="lg">
        <Tooltip auto content="This is a large example of a multi line label">
          <Text truncate>This is a large example of a multi line label</Text>
        </Tooltip>
      </Switch>
    </Group>
  ),
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
  render: (args) => (
    <Group flexDirection="column" gap="16">
      <Switch {...args} />
      <Switch {...args} disabled />
    </Group>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <Group flexDirection="column" gap="16">
      <Switch {...args} defaultChecked />
      <Switch {...args} />
    </Group>
  ),
};

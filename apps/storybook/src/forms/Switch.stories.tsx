import type { Meta, StoryObj } from "@storybook/react";

import { Flex, Switch, Text, Tooltip } from "@optiaxiom/react";

export default {
  args: {
    children: "Label",
  },
  component: Switch,
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
    <Flex w="208">
      <Switch {...args} />
      <Switch {...args}>This is a medium example of a multi line label</Switch>
      <Switch {...args} size="lg">
        This is a large example of a multi line label
      </Switch>
    </Flex>
  ),
};

export const WithTooltip: Story = {
  render: (args) => (
    <Flex w="208">
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
    </Flex>
  ),
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
  render: (args) => (
    <Flex>
      <Switch {...args} />
      <Switch {...args} disabled />
    </Flex>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <Flex>
      <Switch {...args} defaultChecked />
      <Switch {...args} />
    </Flex>
  ),
};

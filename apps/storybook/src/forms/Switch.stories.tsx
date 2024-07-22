import type { Meta, StoryObj } from "@storybook/react";

import { Flex, Switch, Text } from "@optiaxiom/react";

export default {
  args: {
    children: "Label",
  },
  component: Switch,
} as Meta<typeof Switch>;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {};

export const Large: Story = {
  args: {
    size: "lg",
  },
};

export const HelperText: Story = {
  args: {
    endDecorator: (
      <Text color="fg.secondary" fontSize="sm">
        Helper Text
      </Text>
    ),
  },
};

export const MultiLineLabel: Story = {
  args: {
    children: "Label",
    endDecorator: (
      <Text color="fg.secondary" fontSize="sm">
        Helper Text
      </Text>
    ),
  },
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

export const Disabled: Story = {
  args: {
    defaultChecked: true,
    disabled: true,
  },
};

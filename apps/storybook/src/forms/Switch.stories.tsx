import type { Meta, StoryObj } from "@storybook/react";

import { Flex, Switch } from "@optiaxiom/react";

const meta: Meta<typeof Switch> = {
  component: Switch,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Switch>;
export const Default: Story = {
  render: () => (
    <Flex>
      <Switch id="switch-1" label="On label" />
      <Switch defaultChecked disabled label="Disabled" />
      <Switch label="Read only" readonly />
      <Switch defaultChecked label="Read only" readonly />
      <Switch defaultChecked />
    </Flex>
  ),
};

export const Large: Story = {
  render: () => (
    <Flex>
      <Switch id="switch-1" label="On label" size="lg" />
      <Switch defaultChecked disabled label="Disabled" size="lg" />
      <Switch label="Read only" readonly size="lg" />
      <Switch defaultChecked label="Read only" readonly size="lg" />
      <Switch defaultChecked size="lg" />
    </Flex>
  ),
};

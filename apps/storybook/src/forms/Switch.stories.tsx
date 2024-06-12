import type { Meta, StoryObj } from "@storybook/react";

import { Flex, Switch } from "@optiaxiom/react";

const meta: Meta<typeof Switch> = {
  argTypes: { onChange: { action: "click" } },
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
      <Switch label="On label" />
      <Switch defaultChecked disabled />
      <Switch offLabel="Off label" onLabel="On label" />
      <Switch defaultChecked offLabel="Off label" onLabel="On label" />
    </Flex>
  ),
};

export const Large: Story = {
  render: () => (
    <Flex>
      <Switch label="On label" size="lg" />
      <Switch defaultChecked disabled label="hello" size="lg" />
      <Switch offLabel="Off" onLabel="On" size="lg" />
      <Switch defaultChecked offLabel="Off" onLabel="On" size="lg" />
    </Flex>
  ),
};

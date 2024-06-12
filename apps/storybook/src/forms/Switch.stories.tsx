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
      <Switch onLabel="hello" />
      <Switch defaultChecked={true} disabled={true} />
      <Switch offLabel="Off" onLabel="On" />
      <Switch defaultChecked={true} offLabel="Off" onLabel="On" />
    </Flex>
  ),
};

export const Large: Story = {
  render: () => (
    <Flex>
      <Switch onLabel="hello" size="lg" />
      <Switch defaultChecked={true} disabled={true} label="hello" size="lg" />
      <Switch offLabel="Off" onLabel="On" size="lg" />
      <Switch defaultChecked={true} offLabel="Off" onLabel="On" size="lg" />
    </Flex>
  ),
};

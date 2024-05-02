import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@optiaxiom/react";

const meta: Meta<typeof Button> = {
  component: Button,
  parameters: {
    layout: "centered",
  },
  title: "Components / Button",
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Click me",
  },
};

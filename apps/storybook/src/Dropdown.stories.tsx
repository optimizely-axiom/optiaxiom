import type { Meta, StoryObj } from "@storybook/react";

import { Button, Dropdown } from "@optiaxiom/react";

const meta: Meta<typeof Dropdown> = {
  component: Dropdown,
  title: "Components / Dropdown",
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Primary: Story = {
  args: {
    trigger: <Button>Hi there</Button>
  },
};

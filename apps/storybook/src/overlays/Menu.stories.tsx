import type { Meta, StoryObj } from "@storybook/react";

import {
  Button,
  Menu,
  MenuContent,
  MenuItem,
  MenuTrigger,
} from "@optiaxiom/react";

const meta: Meta<typeof MenuContent> = {
  component: MenuContent,
};

export default meta;

type Story = StoryObj<typeof MenuContent>;

export const Basic: Story = {
  render: () => (
    <Menu>
      <MenuTrigger>
        <Button>Press</Button>
      </MenuTrigger>

      <MenuContent>
        <MenuItem>New Tab</MenuItem>
        <MenuItem>New Window</MenuItem>
        <MenuItem>New Private Window</MenuItem>
      </MenuContent>
    </Menu>
  ),
};

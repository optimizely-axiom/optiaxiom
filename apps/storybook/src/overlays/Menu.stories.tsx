import type { Meta, StoryObj } from "@storybook/react";

import {
  Button,
  Menu,
  MenuContent,
  MenuItem,
  MenuTrigger,
} from "@optiaxiom/react";
import { IconStar } from "@tabler/icons-react";

const meta: Meta<typeof Menu> = {
  component: Menu,
};

export default meta;

type Story = StoryObj<typeof Menu>;

export const Basic: Story = {
  render: () => (
    <Menu>
      <MenuTrigger>
        <Button>Press</Button>
      </MenuTrigger>

      <MenuContent>
        <MenuItem endDecorator={<IconStar />} startDecorator={<IconStar />}>
          Label
        </MenuItem>
        <MenuItem
          disabled
          endDecorator={<IconStar />}
          startDecorator={<IconStar />}
        >
          Disabled
        </MenuItem>
      </MenuContent>
    </Menu>
  ),
};

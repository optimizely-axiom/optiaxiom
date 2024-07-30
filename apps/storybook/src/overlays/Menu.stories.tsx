import type { Meta, StoryObj } from "@storybook/react";

import { Menu, MenuContent, MenuItem, MenuTrigger } from "@optiaxiom/react";
import { expect, screen, userEvent } from "@storybook/test";
import { IconStar } from "@tabler/icons-react";

const meta: Meta<typeof Menu> = {
  component: Menu,
};

export default meta;

type Story = StoryObj<typeof Menu>;

export const Basic: Story = {
  play: async ({ canvas }) => {
    const button = canvas.getByRole("button", {
      name: "Download",
    });

    await userEvent.click(button);

    const menu = await screen.findByRole("menu");
    await expect(menu).toBeInTheDocument();

    const menuItems = screen.getAllByRole("menuitem");
    await expect(menuItems).toHaveLength(2);

    await expect(menuItems[0]).not.toBeDisabled();
    await expect(menuItems[1]).toHaveAttribute("aria-disabled", "true");

    await userEvent.keyboard("{Escape}");
    await expect(menu).not.toBeVisible();
  },
  render: () => (
    <Menu>
      <MenuTrigger>Download</MenuTrigger>

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

import type { Meta, StoryObj } from "@storybook/react";

import { Menu, MenuContent, MenuItem, MenuTrigger } from "@optiaxiom/react";
import { action } from "@storybook/addon-actions";
import { expect, screen, userEvent } from "@storybook/test";
import {
  IconFileExcel,
  IconFileTypePdf,
  IconFileTypePpt,
  IconFileWord,
  IconVideo,
} from "@tabler/icons-react";

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
    await expect(menuItems).toHaveLength(5);

    await expect(menuItems[0]).not.toBeDisabled();
    await expect(menuItems[1]).toHaveAttribute("aria-disabled", "true");

    await userEvent.keyboard("{Escape}");
    await expect(menu).not.toBeVisible();
  },
  render: () => (
    <Menu>
      <MenuTrigger>Download</MenuTrigger>

      <MenuContent>
        <MenuItem onSelect={action("excel")} startDecorator={<IconFileExcel />}>
          Excel
        </MenuItem>
        <MenuItem
          disabled
          onSelect={action("pdf")}
          startDecorator={<IconFileTypePdf />}
        >
          PDF
        </MenuItem>
        <MenuItem onSelect={action("ppt")} startDecorator={<IconFileTypePpt />}>
          Powerpoint
        </MenuItem>
        <MenuItem onSelect={action("video")} startDecorator={<IconVideo />}>
          Video
        </MenuItem>
        <MenuItem onSelect={action("word")} startDecorator={<IconFileWord />}>
          Word
        </MenuItem>
      </MenuContent>
    </Menu>
  ),
};

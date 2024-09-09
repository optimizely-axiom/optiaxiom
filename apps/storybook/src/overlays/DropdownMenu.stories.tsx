import type { Meta, StoryObj } from "@storybook/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@optiaxiom/react";
import { action } from "@storybook/addon-actions";
import { expect, screen, userEvent } from "@storybook/test";
import {
  IconFileExcel,
  IconFileTypePdf,
  IconFileTypePpt,
  IconFileWord,
  IconVideo,
} from "@tabler/icons-react";

export default {
  component: DropdownMenu,
} as Meta<typeof DropdownMenu>;

type Story = StoryObj<typeof DropdownMenu>;

export const Basic: Story = {
  args: {
    children: (
      <>
        <DropdownMenuTrigger>Download</DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem
            onSelect={action("excel")}
            startDecorator={<IconFileExcel />}
          >
            Excel
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled
            onSelect={action("pdf")}
            startDecorator={<IconFileTypePdf />}
          >
            PDF
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={action("ppt")}
            startDecorator={<IconFileTypePpt />}
          >
            Powerpoint
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={action("video")}
            startDecorator={<IconVideo />}
          >
            Video
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={action("word")}
            startDecorator={<IconFileWord />}
          >
            Word
          </DropdownMenuItem>
        </DropdownMenuContent>
      </>
    ),
  },
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
};

export const LongContent: Story = {
  args: {
    children: (
      <>
        <DropdownMenuTrigger>Profile</DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel>My Profile</DropdownMenuLabel>
          <DropdownMenuItem>
            This is a really long content to show case how text will wrap.
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </>
    ),
    defaultOpen: true,
  },
};

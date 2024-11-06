import type { Meta, StoryObj } from "@storybook/react";

import {
  Avatar,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  Flex,
} from "@optiaxiom/react";
import { action } from "@storybook/addon-actions";
import { expect, screen, userEvent, waitFor } from "@storybook/test";
import {
  IconFileExcel,
  IconFileTypePdf,
  IconFileTypePpt,
  IconFileWord,
  IconVideo,
} from "@tabler/icons-react";

export default {
  args: {
    defaultOpen: true,
  },
  component: DropdownMenu,
  parameters: {
    useOverlayDecorator: true,
  },
} as Meta<typeof DropdownMenu>;

type Story = StoryObj<typeof DropdownMenu>;

export const Basic: Story = {
  args: {
    children: (
      <>
        <DropdownMenuTrigger>Download</DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem icon={<IconFileExcel />} onSelect={action("excel")}>
            Excel
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled
            icon={<IconFileTypePdf />}
            onSelect={action("pdf")}
          >
            PDF
          </DropdownMenuItem>
          <DropdownMenuItem icon={<IconFileTypePpt />} onSelect={action("ppt")}>
            Powerpoint
          </DropdownMenuItem>
          <DropdownMenuItem icon={<IconVideo />} onSelect={action("video")}>
            Video
          </DropdownMenuItem>
          <DropdownMenuItem icon={<IconFileWord />} onSelect={action("word")}>
            Word
          </DropdownMenuItem>
        </DropdownMenuContent>
      </>
    ),
    defaultOpen: false,
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
  },
};

export const Description: Story = {
  args: {
    children: (
      <>
        <DropdownMenuTrigger>Content</DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem description="Create a new task">
            New task
          </DropdownMenuItem>
          <DropdownMenuItem description="Copy this task">
            Copy task
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem colorScheme="danger">Delete task</DropdownMenuItem>
        </DropdownMenuContent>
      </>
    ),
  },
  play: async () => {
    await waitFor(
      async () =>
        await expect(
          screen.getByRole("menuitem", { name: "New task" }),
        ).toBeVisible(),
    );
    await waitFor(
      async () =>
        await expect(
          screen.getByRole("menuitem", { description: "Copy this task" }),
        ).toBeVisible(),
    );
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
  },
  play: async () => {
    await waitFor(
      async () =>
        await expect(
          screen.getByRole("menuitem", { name: "Logout" }),
        ).toBeVisible(),
    );
  },
};

export const Nested: Story = {
  args: {
    children: (
      <>
        <DropdownMenuTrigger>Profile</DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel>My Profile</DropdownMenuLabel>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Settings</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Privacy</DropdownMenuItem>
              <DropdownMenuItem>Security</DropdownMenuItem>
              <DropdownMenuItem>Policy</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </>
    ),
  },
  play: async () => {
    await waitFor(
      async () =>
        await expect(
          screen.getByRole("menuitem", { name: "Settings" }),
        ).not.toHaveStyle("pointer-events: none"),
    );

    await userEvent.hover(screen.getByRole("menuitem", { name: "Settings" }));
    await waitFor(
      async () =>
        await expect(
          screen.getByRole("menuitem", { name: "Privacy" }),
        ).toBeVisible(),
    );
  },
};

export const TriggerWidth: Story = {
  render: (args) => (
    <Flex flexDirection="row">
      <DropdownMenu {...args}>
        <DropdownMenuTrigger>Really long trigger</DropdownMenuTrigger>

        <DropdownMenuContent minW="trigger">
          <DropdownMenuItem>PDF</DropdownMenuItem>
          <DropdownMenuItem>Word</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu {...args}>
        <DropdownMenuTrigger>Small</DropdownMenuTrigger>

        <DropdownMenuContent minW="0">
          <DropdownMenuItem>Really long menu item</DropdownMenuItem>
          <DropdownMenuItem>Another really long menu item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Flex>
  ),
};

export const AvatarTrigger: Story = {
  args: {
    children: (
      <>
        <DropdownMenuTrigger appearance="subtle" icon={null} iconOnly size="lg">
          <Avatar name="Arthur Morgan" size="sm" />
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel>My Profile</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </>
    ),
  },
};

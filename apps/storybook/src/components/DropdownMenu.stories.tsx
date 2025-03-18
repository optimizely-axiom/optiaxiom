import type { Meta, StoryObj } from "@storybook/react";

import {
  Avatar,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
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
  IconBell,
  IconBook,
  IconFileExcel,
  IconFileTypePdf,
  IconFileTypePpt,
  IconFileWord,
  IconHelp,
  IconLock,
  IconLogout,
  IconSettings,
  IconUser,
  IconVideo,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";

export default {
  args: {
    defaultOpen: true,
  },
  component: DropdownMenu,
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
          <DropdownMenuItem intent="danger">Delete task</DropdownMenuItem>
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
        <DropdownMenuTrigger appearance="subtle" icon={null} size="lg" square>
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

export const Group: Story = {
  args: {
    children: (
      <>
        <DropdownMenuTrigger appearance="subtle" icon={null} size="lg" square>
          <Avatar
            name="Arya Stark"
            size="sm"
            src="https://i.pravatar.cc/150?img=10"
          />
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem addonBefore={<IconUser />}>
              Account
            </DropdownMenuItem>
            <DropdownMenuItem addonBefore={<IconSettings />}>
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem addonBefore={<IconLock />}>
              Privacy
            </DropdownMenuItem>
            <DropdownMenuItem addonBefore={<IconBell />}>
              Notifications
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem addonBefore={<IconBook />}>
              Help Guide
            </DropdownMenuItem>
            <DropdownMenuItem addonBefore={<IconHelp />}>
              Help Center
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />

          <DropdownMenuItem addonBefore={<IconLogout />}>
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </>
    ),
  },
};

export const AsyncLoading: Story = {
  render: function AsyncLoading(args) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }, []);

    return (
      <DropdownMenu {...args}>
        <DropdownMenuTrigger>Content</DropdownMenuTrigger>

        <DropdownMenuContent loading={isLoading}>
          {!isLoading && (
            <>
              <DropdownMenuItem>New task</DropdownMenuItem>
              <DropdownMenuItem>Copy task</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem intent="danger">Delete task</DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

export const CheckboxItem: Story = {
  render: function NotificationSettings(args) {
    const [notifications, setNotifications] = useState<string[]>(["email"]);

    const notificationOptions = [
      { id: "email", label: "Email Notifications" },
      { id: "push", label: "Push Notifications" },
      { id: "sms", label: "SMS Notifications" },
      { id: "slack", label: "Slack Notifications" },
    ];

    const handleNotificationChange = (type: string, checked: boolean) => {
      setNotifications((prev) => {
        if (checked) {
          return [...prev, type];
        }
        return prev.filter((t) => t !== type);
      });
    };

    return (
      <DropdownMenu {...args}>
        <DropdownMenuTrigger>Notification Settings</DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem>
            Active Channels: {notifications.length}
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          {notificationOptions.map((option) => (
            <DropdownMenuCheckboxItem
              checked={notifications.includes(option.id)}
              disabled={option.id === "push"}
              key={option.id}
              onCheckedChange={(checked) =>
                handleNotificationChange(option.id, checked)
              }
            >
              {option.label}
            </DropdownMenuCheckboxItem>
          ))}

          <DropdownMenuSeparator />
          <DropdownMenuItem
            disabled={notifications.length === 0}
            intent="danger"
            onSelect={() => setNotifications([])}
          >
            Disable All
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

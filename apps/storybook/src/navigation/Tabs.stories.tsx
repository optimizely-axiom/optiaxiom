import type { Meta, StoryObj } from "@storybook/react";

import { Box, Tabs } from "@optiaxiom/react";
import { expect, screen, userEvent, within } from "@storybook/test";

const meta: Meta<typeof Tabs> = {
  component: Tabs,
};

export default meta;

type Story = StoryObj<typeof Tabs>;

const primaryItems = [
  {
    content: (
      <Box p="2">
        <h3>Account Settings</h3>
        <p>Manage your account details and preferences here.</p>
      </Box>
    ),
    name: "Account",
  },
  {
    content: (
      <Box p="2">
        <h3>Password Settings</h3>
        <p>Update your password and security settings here.</p>
      </Box>
    ),
    name: "Password",
  },
  {
    content: (
      <Box p="2">
        <h3>Notification Preferences</h3>
        <p>Control how and when you receive notifications.</p>
      </Box>
    ),
    name: "Notifications",
  },
];

export const Primary: Story = {
  args: {
    defaultValue: primaryItems[0].name,
    items: primaryItems,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByRole("tab", { name: "Account" }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("tab", { name: "Password" }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("tab", { name: "Notifications" }),
    ).toBeInTheDocument();
    await expect(canvas.getByRole("tab", { name: "Account" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    await userEvent.click(canvas.getByRole("tab", { name: "Password" }));
    await expect(canvas.getByRole("tab", { name: "Password" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    await expect(
      screen.getByText("Update your password and security settings here."),
    ).toBeVisible();
  },
};

export const WithIcons: Story = {
  args: {
    items: [
      {
        content: (
          <Box p="2">
            <h3>Photo Gallery</h3>
            <p>Browse and manage your photo collection.</p>
          </Box>
        ),
        name: "Photos",
      },
      {
        content: (
          <Box p="2">
            <h3>Video Library</h3>
            <p>Access and organize your video content.</p>
          </Box>
        ),
        name: "Videos",
      },
      {
        content: (
          <Box p="2">
            <h3>Music Collection</h3>
            <p>Explore and manage your music library.</p>
          </Box>
        ),
        name: "Music",
      },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByRole("tab", { name: "Photos" }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("tab", { name: "Videos" }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("tab", { name: "Music" }),
    ).toBeInTheDocument();
    await userEvent.click(canvas.getByRole("tab", { name: "Music" }));
    await expect(canvas.getByRole("tab", { name: "Music" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    await expect(
      screen.getByText("Explore and manage your music library."),
    ).toBeVisible();
  },
};

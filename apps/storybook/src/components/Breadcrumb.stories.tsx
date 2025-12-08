import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Breadcrumb,
  Button,
  Group,
  Separator,
  toaster,
} from "@optiaxiom/react";
import { IconPencil } from "@tabler/icons-react";

export default {
  component: Breadcrumb,
  render: ({ items, ...args }) => (
    <Group flexDirection="column" gap="16">
      <Breadcrumb items={items} {...args} />
      <Breadcrumb
        aria-label="Breadcrumb buttons"
        items={items.map(({ href, ...item }) => ({
          ...item,
          execute: () => toaster.create(`Clicked: ${href}`),
        }))}
        {...args}
      />
    </Group>
  ),
} as Meta<typeof Breadcrumb>;

type Story = StoryObj<typeof Breadcrumb>;

export const Basic: Story = {
  args: {
    items: [
      {
        href: "/",
        label: "Home",
      },
      {
        href: "/documentation",
        label: "Documentation",
      },
    ],
  },
};

export const WithEllipsis: Story = {
  args: {
    items: [
      {
        href: "/",
        label: "Home",
      },
      {
        href: "/documentation",
        label: "Documentation",
      },
      {
        href: "/themes",
        label: "Themes",
      },
      {
        href: "https://github.com/optimizely-axiom/optiaxiom",
        label: "GitHub",
      },
      {
        href: "/components",
        label: "Components",
      },
      {
        href: "/breadcrumb",
        label: "Breadcrumb",
      },
    ],
  },
};

export const Addons: Story = {
  args: {
    items: [
      {
        href: "/",
        label: "Home",
      },
      {
        addonAfter: (
          <Button
            appearance="subtle"
            aria-label="Edit"
            icon={<IconPencil />}
            size="sm"
          />
        ),
        href: "/documentation",
        label: "Documentation",
      },
      {
        addonAfter: (
          <Group gap="8" ml="4">
            <Separator orientation="vertical" />
            CPN-3461
          </Group>
        ),
        href: "/components",
        label: "Campaign",
      },
    ],
  },
};

export const Truncated: Story = {
  args: {
    items: [
      {
        href: "/",
        label: "This is a home page breadcrumb",
      },
      {
        addonAfter: (
          <Button
            appearance="subtle"
            aria-label="Edit"
            icon={<IconPencil />}
            size="sm"
          />
        ),
        href: "/components",
        label: "This is a component page breadcrumb",
      },
      {
        href: "/page",
        label: "This is a page of breadcrumb",
      },
    ],
  },
};

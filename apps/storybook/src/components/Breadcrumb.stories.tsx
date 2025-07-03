import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button, Flex, Separator, toaster } from "@optiaxiom/react";
import { Breadcrumb } from "@optiaxiom/react/unstable";
import { IconPencil } from "@tabler/icons-react";

export default {
  component: Breadcrumb,
  render: ({ items, ...args }) => (
    <Flex>
      <Breadcrumb items={items} {...args} />
      <Breadcrumb
        aria-label="Breadcrumb buttons"
        items={items.map(({ href, ...item }) => ({
          ...item,
          execute: () => toaster.create(`Clicked: ${href}`),
        }))}
        {...args}
      />
    </Flex>
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
          <Flex flexDirection="row" gap="8" ml="4">
            <Separator orientation="vertical" />
            CPN-3461
          </Flex>
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

import type { Meta, StoryObj } from "@storybook/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Link,
} from "@optiaxiom/react";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@optiaxiom/react/unstable";
import { IconChevronRight } from "@tabler/icons-react";

const meta: Meta<typeof Breadcrumb> = {
  args: {
    children: [
      <BreadcrumbItem key="home">
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>,
      <BreadcrumbSeparator key="sep1" />,
      <BreadcrumbItem key="components">
        <BreadcrumbLink href="/documents">Documents</BreadcrumbLink>
      </BreadcrumbItem>,
      <BreadcrumbSeparator key="sep2" />,
      <BreadcrumbItem key="theme">
        <BreadcrumbLink href="/theme">Theme</BreadcrumbLink>
      </BreadcrumbItem>,
      <BreadcrumbSeparator key="sep3" />,
      <BreadcrumbItem key="components">
        <BreadcrumbLink href="/components">Components</BreadcrumbLink>
      </BreadcrumbItem>,
      <BreadcrumbSeparator key="sep4" />,
      <BreadcrumbItem key="breadcrumb">
        <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
      </BreadcrumbItem>,
    ],
  },
  component: Breadcrumb,
};

export default meta;

type Story = StoryObj<typeof Breadcrumb>;

export const Basic: Story = {};

export const WithEllipsis: Story = {
  args: {
    children: [
      <BreadcrumbItem key="home">
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>,
      <BreadcrumbSeparator key="sep1" />,
      <BreadcrumbItem key="ellipsis">
        <BreadcrumbEllipsis />
      </BreadcrumbItem>,
      <BreadcrumbSeparator key="sep2" />,
      <BreadcrumbItem key="components">
        <BreadcrumbLink href="/components">Components</BreadcrumbLink>
      </BreadcrumbItem>,
      <BreadcrumbSeparator key="sep3" />,
      <BreadcrumbItem key="breadcrumb">
        <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
      </BreadcrumbItem>,
    ],
  },
};

export const WithDropdown: Story = {
  args: {
    children: [
      <BreadcrumbItem key="home">
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>,
      <BreadcrumbSeparator key="sep1" />,
      <BreadcrumbItem key="components">
        <DropdownMenu>
          <DropdownMenuTrigger
            appearance="secondary"
            icon={undefined}
            size="sm"
          >
            <BreadcrumbEllipsis />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem>
              <Link href="/docs">Documentation</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/themes">Themes</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="https://github.com/optiaxiom/ui">GitHub</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </BreadcrumbItem>,
      <BreadcrumbSeparator key="sep2" />,
      <BreadcrumbItem key="breadcrumb">
        <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
      </BreadcrumbItem>,
    ],
  },
};
export const CustomSeparator: Story = {
  args: {
    children: [
      <BreadcrumbItem key="home">
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>,
      <BreadcrumbSeparator key="sep1">
        <IconChevronRight />
      </BreadcrumbSeparator>,
      <BreadcrumbItem key="components">
        <BreadcrumbLink href="/components">Components</BreadcrumbLink>
      </BreadcrumbItem>,
      <BreadcrumbSeparator key="sep2">
        <IconChevronRight />
      </BreadcrumbSeparator>,
      <BreadcrumbItem key="breadcrumb">
        <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
      </BreadcrumbItem>,
    ],
  },
};

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

export default {
  args: {
    children: (
      <>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />,
        <BreadcrumbItem>
          <BreadcrumbLink href="/documents">Documents</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />,
        <BreadcrumbItem>
          <BreadcrumbLink href="/theme">Theme</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />,
        <BreadcrumbItem>
          <BreadcrumbLink href="/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />,
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
        ,
      </>
    ),
  },
  component: Breadcrumb,
} as Meta<typeof Breadcrumb>;

type Story = StoryObj<typeof Breadcrumb>;

export const Basic: Story = {};

export const WithEllipsis: Story = {
  args: {
    children: (
      <>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />,
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />,
        <BreadcrumbItem>
          <BreadcrumbLink href="/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />,
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
        ,
      </>
    ),
  },
};

export const WithDropdown: Story = {
  args: {
    children: (
      <>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />,
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger appearance="subtle" icon={undefined} size="sm">
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
        </BreadcrumbItem>
        <BreadcrumbSeparator />,
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </>
    ),
  },
};
export const CustomSeparator: Story = {
  args: {
    children: (
      <>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <IconChevronRight />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <IconChevronRight />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
        ,
      </>
    ),
  },
};

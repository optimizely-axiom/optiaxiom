import type { Meta, StoryObj } from "@storybook/react";

import {
  Avatar,
  Box,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@optiaxiom/react";
import {
  GlobalNav,
  GlobalNavAccountItem,
  GlobalNavItem,
  GlobalNavToggle,
} from "@optiaxiom/react/unstable";
import {
  IconBinaryTree,
  IconChartInfographic,
  IconChartLine,
  IconExternalLink,
  IconFlag2,
  IconHistory,
  IconLayoutSidebar,
  IconSettings,
  IconUsers,
  IconVocabulary,
} from "@tabler/icons-react";

export default {
  args: {
    addonAfter: (
      <>
        <GlobalNavToggle icon={<IconLayoutSidebar />} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <GlobalNavAccountItem
              avatar={
                <Avatar src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80" />
              }
              name="Rhaenyra Targaryen"
              organization="Optimizely"
            />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" side="right">
            <DropdownMenuItem>View Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    ),
    children: (
      <>
        <GlobalNavItem icon={<IconBinaryTree />}>Projects</GlobalNavItem>
        <GlobalNavItem active icon={<IconFlag2 />}>
          Flags
        </GlobalNavItem>
        <GlobalNavItem icon={<IconChartInfographic />}>Reports</GlobalNavItem>
        <GlobalNavItem icon={<IconUsers />}>Audiences</GlobalNavItem>
        <GlobalNavItem icon={<IconHistory />}>History</GlobalNavItem>
        <GlobalNavItem icon={<IconChartLine />}>Events</GlobalNavItem>
        <GlobalNavItem icon={<IconSettings />}>Settings</GlobalNavItem>
        <GlobalNavItem
          addonAfter={<IconExternalLink size="16" />}
          asChild
          icon={<IconVocabulary />}
        >
          <a href="/">Tutorial</a>
        </GlobalNavItem>
      </>
    ),
    style: {
      height: "80vh",
    },
  },
  component: GlobalNav,
  decorators: (Story) => (
    <Box bg="neutral.50" p="lg">
      <Story />
    </Box>
  ),
} as Meta<typeof GlobalNav>;

type Story = StoryObj<typeof GlobalNav>;

export const Basic: Story = {};

export const NotCollapsible: Story = {
  args: {
    addonAfter: (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <GlobalNavAccountItem
              avatar={
                <Avatar src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80" />
              }
              name="Rhaenyra Targaryen"
              organization="Optimizely"
            />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" side="right">
            <DropdownMenuItem>View Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    ),
  },
};

export const Expanded: Story = {
  args: {
    expanded: true,
  },
};

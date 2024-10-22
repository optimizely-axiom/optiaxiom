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
  SideNav,
  SideNavAccountItem,
  SideNavItem,
  SideNavToggle,
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
        <SideNavToggle icon={<IconLayoutSidebar />} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SideNavAccountItem
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
        <SideNavItem aria-label="Projects" icon={<IconBinaryTree />}>
          Projects
        </SideNavItem>
        <SideNavItem active aria-label="Flags" icon={<IconFlag2 />}>
          Flags
        </SideNavItem>
        <SideNavItem aria-label="Reports" icon={<IconChartInfographic />}>
          Reports
        </SideNavItem>
        <SideNavItem aria-label="Audiences" icon={<IconUsers />}>
          Audiences
        </SideNavItem>
        <SideNavItem aria-label="History" icon={<IconHistory />}>
          History
        </SideNavItem>
        <SideNavItem aria-label="Events" icon={<IconChartLine />}>
          Events
        </SideNavItem>
        <SideNavItem aria-label="Settings" icon={<IconSettings />}>
          Settings
        </SideNavItem>
        <SideNavItem
          addonAfter={<IconExternalLink size="16" />}
          aria-label="Tutorial"
          asChild
          icon={<IconVocabulary />}
        >
          <a href="/">Tutorial</a>
        </SideNavItem>
      </>
    ),
    style: {
      height: "80vh",
    },
  },
  component: SideNav,
  decorators: (Story) => (
    <Box bg="bg.page" p="lg" w="288">
      <Story />
    </Box>
  ),
} as Meta<typeof SideNav>;

type Story = StoryObj<typeof SideNav>;

export const Basic: Story = {};

export const NotCollapsible: Story = {
  args: {
    addonAfter: (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SideNavAccountItem
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
    defaultExpanded: true,
  },
};

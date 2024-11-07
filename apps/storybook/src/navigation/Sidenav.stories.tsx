import type { Meta, StoryObj } from "@storybook/react";

import {
  Avatar,
  Box,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Sidenav,
  SidenavAccountItem,
  SidenavItem,
  SidenavToggle,
} from "@optiaxiom/react";
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
        <SidenavToggle icon={<IconLayoutSidebar />} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidenavAccountItem
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
        <SidenavItem aria-label="Projects" icon={<IconBinaryTree />}>
          Projects
        </SidenavItem>
        <SidenavItem active aria-label="Flags" icon={<IconFlag2 />}>
          Flags
        </SidenavItem>
        <SidenavItem aria-label="Idea Lab" icon={<IconChartInfographic />}>
          Idea Lab
        </SidenavItem>
        <SidenavItem aria-label="Audiences" icon={<IconUsers />}>
          Audiences
        </SidenavItem>
        <SidenavItem aria-label="History" icon={<IconHistory />}>
          History
        </SidenavItem>
        <SidenavItem aria-label="Events" icon={<IconChartLine />}>
          Events
        </SidenavItem>
        <SidenavItem aria-label="Settings" icon={<IconSettings />}>
          Settings
        </SidenavItem>
        <SidenavItem
          addonAfter={<IconExternalLink size="16" />}
          aria-label="Tutorial"
          asChild
          icon={<IconVocabulary />}
        >
          <a href="/">Tutorial</a>
        </SidenavItem>
      </>
    ),
    style: {
      height: "80vh",
    },
  },
  component: Sidenav,
  decorators: (Story) => (
    <Box bg="bg.page" p="lg" w="288">
      <Story />
    </Box>
  ),
} as Meta<typeof Sidenav>;

type Story = StoryObj<typeof Sidenav>;

export const Basic: Story = {};

export const NotCollapsible: Story = {
  args: {
    addonAfter: (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidenavAccountItem
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

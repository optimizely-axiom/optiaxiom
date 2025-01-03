import type { Meta, StoryObj } from "@storybook/react";

import {
  Box,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Sidenav,
  SidenavAccountItem,
  SidenavBody,
  SidenavFooter,
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

const body = (
  <SidenavBody>
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
  </SidenavBody>
);

export default {
  args: {
    children: (
      <>
        {body}

        <SidenavFooter>
          <SidenavToggle icon={<IconLayoutSidebar />} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidenavAccountItem
                name="Rhaenyra Targaryen"
                organization="Optimizely"
                src="https://i.pravatar.cc/150?img=10"
              />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" side="right">
              <DropdownMenuItem>View Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidenavFooter>
      </>
    ),
    style: {
      height: "80vh",
    },
  },
  component: Sidenav,
  decorators: (Story) => (
    <Box bg="bg.page" p="24" w="384">
      <Story />
    </Box>
  ),
} as Meta<typeof Sidenav>;

type Story = StoryObj<typeof Sidenav>;

export const Basic: Story = {};

export const NotCollapsible: Story = {
  args: {
    children: (
      <>
        {body}

        <SidenavFooter>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidenavAccountItem
                name="Rhaenyra Targaryen"
                organization="Optimizely"
                src="https://i.pravatar.cc/150?img=10"
              />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" side="right">
              <DropdownMenuItem>View Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidenavFooter>
      </>
    ),
  },
};

export const Expanded: Story = {
  args: {
    defaultExpanded: true,
  },
};

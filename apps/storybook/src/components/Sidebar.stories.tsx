import type { Meta, StoryObj } from "@storybook/react";

import {
  Box,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Nav,
  NavAccountItem,
  NavBody,
  NavFooter,
  NavGroup,
  NavGroupContent,
  NavGroupTrigger,
  NavItem,
  NavList,
  NavSeparator,
  Sidebar,
  SidebarToggle,
  SubNav,
} from "@optiaxiom/react";
import {
  IconBinaryTree,
  IconChartInfographic,
  IconChartLine,
  IconCopy,
  IconDashboard,
  IconDeviceDesktop,
  IconExternalLink,
  IconFlag2,
  IconHistory,
  IconLayoutSidebar,
  IconRectangle,
  IconReport,
  IconSettings,
  IconStar,
  IconTestPipe,
  IconTrash,
  IconUsers,
  IconVocabulary,
} from "@tabler/icons-react";

const body = (
  <NavBody>
    <NavList>
      <NavItem icon={<IconBinaryTree />}>Projects</NavItem>
      <NavItem active icon={<IconFlag2 />}>
        Flags
      </NavItem>
      <NavItem icon={<IconChartInfographic />}>Idea Lab</NavItem>
      <NavItem icon={<IconUsers />}>Audiences</NavItem>
      <NavItem icon={<IconHistory />}>History</NavItem>
      <NavItem icon={<IconChartLine />}>Events</NavItem>
      <NavItem icon={<IconSettings />}>Settings</NavItem>
      <NavItem
        addonAfter={<IconExternalLink size="16" />}
        asChild
        icon={<IconVocabulary />}
      >
        <a href="/">Tutorial</a>
      </NavItem>
    </NavList>
  </NavBody>
);

export default {
  args: {
    children: (
      <Nav>
        {body}

        <NavFooter>
          <NavList>
            <SidebarToggle icon={<IconLayoutSidebar />} />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <NavAccountItem
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
          </NavList>
        </NavFooter>
      </Nav>
    ),
    style: {
      height: "80vh",
    },
  },
  component: Sidebar,
  decorators: (Story) => (
    <Box
      bg="bg.page"
      p="24"
      style={{
        width: "600px",
      }}
    >
      <Story />
    </Box>
  ),
} as Meta<typeof Sidebar>;

type Story = StoryObj<typeof Sidebar>;

export const Basic: Story = {};

export const NotCollapsible: Story = {
  args: {
    children: (
      <Nav>
        {body}

        <NavFooter>
          <NavList>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <NavAccountItem
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
          </NavList>
        </NavFooter>
      </Nav>
    ),
  },
};

export const Expanded: Story = {
  args: {
    defaultExpanded: true,
  },
};

export const WithSubNav: Story = {
  args: {
    children: (
      <>
        <Nav>
          {body}

          <NavFooter>
            <NavList>
              <SidebarToggle icon={<IconLayoutSidebar />} />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <NavAccountItem
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
            </NavList>
          </NavFooter>
        </Nav>

        <SubNav>
          <NavBody>
            <NavList>
              <NavItem icon={<IconCopy />}>All</NavItem>
              <NavItem icon={<IconRectangle />}>Recent</NavItem>
              <NavItem icon={<IconStar />}>Favorites</NavItem>
              <NavItem icon={<IconTrash />}>Trash</NavItem>

              <NavGroup collapsible>
                <NavGroupTrigger>Location</NavGroupTrigger>

                <NavGroupContent>
                  <NavItem active icon={<IconDashboard />}>
                    CMP
                  </NavItem>
                  <NavItem icon={<IconDeviceDesktop />}>CMS</NavItem>
                  <NavItem icon={<IconTestPipe />}>Experimentation</NavItem>
                </NavGroupContent>
              </NavGroup>

              <NavGroup>
                <NavSeparator />

                <NavGroupTrigger>Analytics</NavGroupTrigger>

                <NavGroupContent>
                  <NavItem icon={<IconDashboard />}>Dashboard</NavItem>
                  <NavItem icon={<IconReport />}>Reports</NavItem>
                </NavGroupContent>
              </NavGroup>
            </NavList>
          </NavBody>
        </SubNav>
      </>
    ),
  },
};

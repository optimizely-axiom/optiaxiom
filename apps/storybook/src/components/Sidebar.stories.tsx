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
  NavItem,
  NavList,
  Sidebar,
  SidebarToggle,
} from "@optiaxiom/react";
import {
  NavGroup,
  NavGroupLabel,
  NavSeparator,
  SubNav,
} from "@optiaxiom/react/unstable";
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
      <NavItem aria-label="Projects" icon={<IconBinaryTree />}>
        Projects
      </NavItem>
      <NavItem active aria-label="Flags" icon={<IconFlag2 />}>
        Flags
      </NavItem>
      <NavItem aria-label="Idea Lab" icon={<IconChartInfographic />}>
        Idea Lab
      </NavItem>
      <NavItem aria-label="Audiences" icon={<IconUsers />}>
        Audiences
      </NavItem>
      <NavItem aria-label="History" icon={<IconHistory />}>
        History
      </NavItem>
      <NavItem aria-label="Events" icon={<IconChartLine />}>
        Events
      </NavItem>
      <NavItem aria-label="Settings" icon={<IconSettings />}>
        Settings
      </NavItem>
      <NavItem
        addonAfter={<IconExternalLink size="16" />}
        aria-label="Tutorial"
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
              <NavItem aria-label="All" icon={<IconCopy />}>
                All
              </NavItem>
              <NavItem aria-label="Recent" icon={<IconRectangle />}>
                Recent
              </NavItem>
              <NavItem aria-label="Favorites" icon={<IconStar />}>
                Favorites
              </NavItem>
              <NavItem aria-label="Trash" icon={<IconTrash />}>
                Trash
              </NavItem>

              <NavGroup defaultOpen>
                <NavSeparator />

                <NavGroupLabel>Location</NavGroupLabel>

                <NavList>
                  <NavItem active aria-label="CMP" icon={<IconDashboard />}>
                    CMP
                  </NavItem>
                  <NavItem aria-label="CMS" icon={<IconDeviceDesktop />}>
                    CMS
                  </NavItem>
                  <NavItem aria-label="Experimentation" icon={<IconTestPipe />}>
                    Experimentation
                  </NavItem>
                </NavList>
              </NavGroup>

              <NavGroup defaultOpen>
                <NavSeparator />

                <NavGroupLabel>Analytics</NavGroupLabel>

                <NavList>
                  <NavItem aria-label="Dashboard" icon={<IconDashboard />}>
                    Dashboard
                  </NavItem>
                  <NavItem aria-label="Reports" icon={<IconReport />}>
                    Reports
                  </NavItem>
                </NavList>
              </NavGroup>
            </NavList>
          </NavBody>
        </SubNav>
      </>
    ),
  },
};

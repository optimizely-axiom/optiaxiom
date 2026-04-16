import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  IconAccountTree,
  IconArticle,
  IconBarChart4Bars,
  IconContentCopy,
  IconDashboardCustomize,
  IconDelete,
  IconDesktopWindows,
  IconDockToRight,
  IconExperiment,
  IconFlag2,
  IconGroup,
  IconHistory,
  IconMenuBook,
  IconOpenInNew,
  IconSettings,
  IconShowChart,
  IconStar,
} from "@optiaxiom/icons";
import {
  Box,
  Menu,
  MenuContent,
  MenuTrigger,
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

const body = (
  <NavBody>
    <NavList>
      <NavItem icon={<IconAccountTree />}>Projects</NavItem>
      <NavItem active icon={<IconFlag2 />}>
        Flags
      </NavItem>
      <NavItem icon={<IconBarChart4Bars />}>Idea Lab</NavItem>
      <NavItem icon={<IconGroup />}>Audiences</NavItem>
      <NavItem icon={<IconHistory />}>History</NavItem>
      <NavItem icon={<IconShowChart />}>Events</NavItem>
      <NavItem icon={<IconSettings />}>Settings</NavItem>
      <NavItem addonAfter={<IconOpenInNew />} asChild icon={<IconMenuBook />}>
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
            <SidebarToggle icon={<IconDockToRight />} />
            <Menu
              options={[
                { label: "View Profile" },
                { label: "Settings" },
                { label: "Logout" },
              ]}
            >
              <MenuTrigger asChild>
                <NavAccountItem
                  name="Rhaenyra Targaryen"
                  organization="Optimizely"
                  src="https://i.pravatar.cc/150?img=10"
                />
              </MenuTrigger>
              <MenuContent align="end" side="right" />
            </Menu>
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
            <Menu
              options={[
                { label: "View Profile" },
                { label: "Settings" },
                { label: "Logout" },
              ]}
            >
              <MenuTrigger asChild>
                <NavAccountItem
                  name="Rhaenyra Targaryen"
                  organization="Optimizely"
                  src="https://i.pravatar.cc/150?img=10"
                />
              </MenuTrigger>
              <MenuContent align="end" side="right" />
            </Menu>
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
              <SidebarToggle icon={<IconDockToRight />} />
              <Menu
                options={[
                  { label: "View Profile" },
                  { label: "Settings" },
                  { label: "Logout" },
                ]}
              >
                <MenuTrigger asChild>
                  <NavAccountItem
                    name="Rhaenyra Targaryen"
                    organization="Optimizely"
                    src="https://i.pravatar.cc/150?img=10"
                  />
                </MenuTrigger>
                <MenuContent align="end" side="right" />
              </Menu>
            </NavList>
          </NavFooter>
        </Nav>

        <SubNav>
          <NavBody>
            <NavList>
              <NavItem icon={<IconContentCopy />}>All</NavItem>
              <NavItem>Recent</NavItem>
              <NavItem icon={<IconStar />}>Favorites</NavItem>
              <NavItem icon={<IconDelete />}>Trash</NavItem>

              <NavGroup collapsible>
                <NavGroupTrigger>Location</NavGroupTrigger>

                <NavGroupContent>
                  <NavItem active icon={<IconDashboardCustomize />}>
                    CMP
                  </NavItem>
                  <NavItem icon={<IconDesktopWindows />}>CMS</NavItem>
                  <NavItem icon={<IconExperiment />}>Experimentation</NavItem>
                </NavGroupContent>
              </NavGroup>

              <NavGroup>
                <NavSeparator />

                <NavGroupTrigger>Analytics</NavGroupTrigger>

                <NavGroupContent>
                  <NavItem icon={<IconDashboardCustomize />}>Dashboard</NavItem>
                  <NavItem icon={<IconArticle />}>Reports</NavItem>
                </NavGroupContent>
              </NavGroup>
            </NavList>
          </NavBody>
        </SubNav>
      </>
    ),
  },
};

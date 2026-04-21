import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  IconArrowUpRightFromSquare,
  IconBookOpen,
  IconChartColumn,
  IconChartLine,
  IconClockRotateLeft,
  IconClone,
  IconDiagramSubtask,
  IconDisplay,
  IconFileLines,
  IconFlag,
  IconFlask,
  IconGear,
  IconGrid2Plus,
  IconPeopleSimple,
  IconSidebar,
  IconStar,
  IconTrashCan,
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
      <NavItem icon={<IconDiagramSubtask />}>Projects</NavItem>
      <NavItem active icon={<IconFlag />}>
        Flags
      </NavItem>
      <NavItem icon={<IconChartColumn />}>Idea Lab</NavItem>
      <NavItem icon={<IconPeopleSimple />}>Audiences</NavItem>
      <NavItem icon={<IconClockRotateLeft />}>History</NavItem>
      <NavItem icon={<IconChartLine />}>Events</NavItem>
      <NavItem icon={<IconGear />}>Settings</NavItem>
      <NavItem
        addonAfter={<IconArrowUpRightFromSquare />}
        asChild
        icon={<IconBookOpen />}
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
            <SidebarToggle icon={<IconSidebar />} />
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
              <SidebarToggle icon={<IconSidebar />} />
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
              <NavItem icon={<IconClone />}>All</NavItem>
              <NavItem>Recent</NavItem>
              <NavItem icon={<IconStar />}>Favorites</NavItem>
              <NavItem icon={<IconTrashCan />}>Trash</NavItem>

              <NavGroup collapsible>
                <NavGroupTrigger>Location</NavGroupTrigger>

                <NavGroupContent>
                  <NavItem active icon={<IconGrid2Plus />}>
                    CMP
                  </NavItem>
                  <NavItem icon={<IconDisplay />}>CMS</NavItem>
                  <NavItem icon={<IconFlask />}>Experimentation</NavItem>
                </NavGroupContent>
              </NavGroup>

              <NavGroup>
                <NavSeparator />

                <NavGroupTrigger>Analytics</NavGroupTrigger>

                <NavGroupContent>
                  <NavItem icon={<IconGrid2Plus />}>Dashboard</NavItem>
                  <NavItem icon={<IconFileLines />}>Reports</NavItem>
                </NavGroupContent>
              </NavGroup>
            </NavList>
          </NavBody>
        </SubNav>
      </>
    ),
  },
};

import type { Meta, StoryObj } from "@storybook/react";

import {
  Box,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Heading,
  Nav,
  NavAccountItem,
  NavBody,
  NavFooter,
  NavItem,
  NavList,
  Sidebar,
  SidebarToggle,
  Text,
} from "@optiaxiom/react";
import { Layout } from "@optiaxiom/react/unstable";
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
  component: Layout,
  decorators: (Story) => (
    <Box style={{ height: "100vh", width: "90vw" }}>
      <Story />
    </Box>
  ),
} satisfies Meta<typeof Layout>;

type Story = StoryObj<typeof Layout>;

const SideNavTemplate = () => (
  <Sidebar>
    <Nav>
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
            Tutorial
          </NavItem>
        </NavList>
      </NavBody>

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
  </Sidebar>
);
const Header = () => (
  <Box bg="bg.secondary" border="2">
    <Heading p="4" size="xl">
      Header
    </Heading>
  </Box>
);

const Content = () => (
  <Box border="1" flexDirection="column" h="full" p="8">
    <Text size="xl">Main Content</Text>
    <Text>This is the main content area of your application.</Text>
  </Box>
);

export const Default: Story = {
  args: {
    children: <Content />,
    header: <Header />,
    sidenav: <SideNavTemplate />,
  },
};

export const NoHeader: Story = {
  args: {
    children: <Content />,
    sidenav: <SideNavTemplate />,
  },
};

export const NoNavbar: Story = {
  args: {
    children: <Content />,
    header: <Header />,
  },
};

export const OnlyContent: Story = {
  args: {
    children: <Content />,
  },
};

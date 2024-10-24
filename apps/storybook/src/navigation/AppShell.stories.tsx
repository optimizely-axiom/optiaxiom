import type { Meta, StoryObj } from "@storybook/react";

import {
  Avatar,
  Box,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Flex,
  Heading,
  Text,
} from "@optiaxiom/react";
import {
  AppShell,
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
  component: AppShell,
  decorators: (Story) => (
    <Box style={{ height: "100vh", width: "100vw" }}>
      <Story />
    </Box>
  ),
} satisfies Meta<typeof AppShell>;

type Story = StoryObj<typeof AppShell>;

const Header = () => (
  <Box bg="gray.100" p="md">
    <Heading size="xl">Header</Heading>
  </Box>
);

const SideNavTemplate = () => (
  <SideNav
    addonAfter={
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
    }
    style={{
      height: "80vh",
    }}
  >
    <SideNavItem icon={<IconBinaryTree />}>Projects</SideNavItem>
    <SideNavItem active icon={<IconFlag2 />}>
      Flags
    </SideNavItem>
    <SideNavItem icon={<IconChartInfographic />}>Reports</SideNavItem>
    <SideNavItem icon={<IconUsers />}>Audiences</SideNavItem>
    <SideNavItem icon={<IconHistory />}>History</SideNavItem>
    <SideNavItem icon={<IconChartLine />}>Events</SideNavItem>
    <SideNavItem icon={<IconSettings />}>Settings</SideNavItem>
    <SideNavItem
      addonAfter={<IconExternalLink size={16} />}
      asChild
      icon={<IconVocabulary />}
    >
      <a href="/">Tutorial</a>
    </SideNavItem>
  </SideNav>
);

const Content = () => (
  <Flex bg="gray.50" flexDirection="column" p="md">
    <Text mb="md" size="xl">
      Main Content
    </Text>
    <Text>This is the main content area of your application.</Text>
  </Flex>
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

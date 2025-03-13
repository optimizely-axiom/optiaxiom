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
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Layout>;

type Story = StoryObj<typeof Layout>;

const SidebarExample = () => (
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
  <Box bg="bg.default.inverse" color="fg.default.inverse" p="16">
    <Heading level="4">Header</Heading>
  </Box>
);

const Content = () => (
  <Box display="flex" flexDirection="column" gap="16">
    <Heading level="3">Main Content</Heading>
    <Text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rhoncus
      tincidunt massa, quis euismod diam fringilla eu. Mauris lobortis laoreet
      enim blandit varius. In vitae orci nec dui feugiat finibus blandit sit
      amet enim. Phasellus congue aliquet justo, eget sollicitudin leo dictum
      et. Donec ac rhoncus sem, ullamcorper porta ex. Aliquam congue ex nec
      rhoncus dignissim. Nulla facilisi. Orci varius natoque penatibus et magnis
      dis parturient montes, nascetur ridiculus mus. In nec elit faucibus,
      tristique arcu et, aliquam neque. Etiam sed erat eu libero mollis tempor.
      Praesent scelerisque mi eu enim lobortis venenatis ut sed ligula.
    </Text>
    <Text>
      Praesent dolor dui, finibus id libero tincidunt, aliquam vehicula lectus.
      Duis tempor et nunc eu scelerisque. Sed luctus at nibh sed facilisis.
      Curabitur eu finibus lacus. Suspendisse tempor posuere eleifend.
      Pellentesque ante quam, varius nec dignissim at, lobortis vel ante. Nunc
      in ullamcorper felis. Integer laoreet, nibh volutpat consequat vehicula,
      lacus lectus mollis ipsum, non dapibus dui dolor sit amet velit. Morbi
      velit ipsum, convallis in massa consectetur, lobortis ultricies arcu. Orci
      varius natoque penatibus et magnis dis parturient montes, nascetur
      ridiculus mus. Nulla justo ex, pulvinar et faucibus sodales, sodales vitae
      ligula. Praesent non orci id sapien malesuada rhoncus et id ante.
    </Text>
    <Text>
      In semper aliquam lectus, non pulvinar lectus dapibus in. Quisque tellus
      massa, sodales sed porttitor sed, luctus tincidunt ipsum. Curabitur eget
      consequat dolor. Nunc diam libero, maximus vel facilisis eu, convallis et
      purus. Quisque a vulputate mi. Maecenas in mauris ac quam rutrum suscipit.
      Aliquam ex augue, rhoncus at quam scelerisque, laoreet sollicitudin neque.
      Fusce arcu nulla, placerat nec tortor ut, fermentum porta odio. Nam
      faucibus lacus eros, ac feugiat ante viverra ut. Aliquam a nunc at arcu
      sollicitudin porttitor. Nam vestibulum ut justo vel rhoncus. Etiam diam
      felis, ornare nec scelerisque in, finibus at sem. Quisque non interdum
      odio.
    </Text>
    <Text>
      Fusce euismod pulvinar nisi vitae blandit. Integer at tortor nibh.
      Suspendisse sodales fermentum libero, nec ornare neque euismod quis.
      Integer at urna tincidunt, tincidunt justo vitae, ornare lorem. Cras
      tempor interdum erat, et euismod leo. Etiam ac interdum lectus. Nunc
      vehicula neque dui, ac varius neque rutrum sed. Proin porttitor
      scelerisque nunc eget aliquam.
    </Text>
    <Text>
      Aliquam interdum felis velit, ut tincidunt mi ornare quis. Duis at
      sollicitudin nulla, vel mattis dolor. Quisque fermentum, mauris sit amet
      molestie ullamcorper, ex ante tristique enim, ac sollicitudin quam lacus a
      ligula. Morbi vel purus quis ante aliquam malesuada. Curabitur in
      tincidunt est. Vivamus at metus enim. Sed eget arcu sollicitudin, tempor
      tortor ac, tempor lorem. Integer gravida libero vel dictum consectetur.
    </Text>
  </Box>
);

export const Default: Story = {
  args: {
    children: <Content />,
    header: <Header />,
    sidebar: <SidebarExample />,
  },
};

export const NoHeader: Story = {
  args: {
    children: <Content />,
    sidebar: <SidebarExample />,
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

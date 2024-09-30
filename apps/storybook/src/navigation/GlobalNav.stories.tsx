import type { Meta, StoryObj } from "@storybook/react";

import { Avatar, Link } from "@optiaxiom/react";
import {
  GlobalNav,
  GlobalNavItem,
  GlobalNavProfileMenu,
} from "@optiaxiom/react/unstable";
import {
  IconBinaryTree,
  IconChartInfographic,
  IconChartLine,
  IconFlag2,
  IconHistory,
  IconSettings,
  IconUsers,
  IconVocabulary,
} from "@tabler/icons-react";

export default {
  component: GlobalNav,
  render: (args) => (
    <GlobalNav
      addonAfter={
        <GlobalNavProfileMenu
          avatar={
            <Avatar src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80" />
          }
          name="Rhaenyra Targaryen"
          organization="Optimizely"
        />
      }
      style={{
        height: "80vh",
      }}
      {...args}
    >
      <GlobalNavItem addonBefore={<IconBinaryTree />}>Projects</GlobalNavItem>
      <GlobalNavItem active addonBefore={<IconFlag2 />}>
        Flags
      </GlobalNavItem>
      <GlobalNavItem addonBefore={<IconChartInfographic />}>
        Reports
      </GlobalNavItem>
      <GlobalNavItem addonBefore={<IconUsers />}>Audiences</GlobalNavItem>
      <GlobalNavItem addonBefore={<IconHistory />}>History</GlobalNavItem>
      <GlobalNavItem addonBefore={<IconChartLine />}>Events</GlobalNavItem>
      <GlobalNavItem addonBefore={<IconSettings />}>Settings</GlobalNavItem>
      <GlobalNavItem
        addonAfter={<Link external href="https://www.google.com/" />}
        addonBefore={<IconVocabulary />}
      >
        Tutorial
      </GlobalNavItem>
    </GlobalNav>
  ),
} as Meta<typeof GlobalNav>;

type Story = StoryObj<typeof GlobalNav>;

export const Basic: Story = {};

export const NotCollapsible: Story = {
  args: {
    collapsible: false,
  },
};

export const Expanded: Story = {
  args: {
    expanded: true,
  },
};

import type { Meta, StoryObj } from "@storybook/react";

import {
  Avatar,
  GlobalNav,
  GlobalNavItem,
  GlobalNavList,
  GlobalNavProfileMenu,
} from "@optiaxiom/react";
import {
  IconBinaryTree,
  IconChartInfographic,
  IconChartLine,
  IconExternalLink,
  IconFlag2,
  IconHistory,
  IconSettings,
  IconUsers,
  IconVocabulary,
} from "@tabler/icons-react";

export default {
  component: GlobalNav,
  title: "GlobalNav",
} as Meta<typeof GlobalNav>;

type Story = StoryObj<typeof GlobalNav>;
export const Collapsed: Story = {
  render: () => (
    <GlobalNav
      endDecorator={
        <GlobalNavProfileMenu avatar={<Avatar name="Rhaenyra" />} />
      }
      style={{
        height: "80vh",
      }}
    >
      <GlobalNavList>
        <GlobalNavItem startDecorator={<IconBinaryTree />} />
        <GlobalNavItem startDecorator={<IconFlag2 />} />
        <GlobalNavItem startDecorator={<IconChartInfographic />} />
        <GlobalNavItem startDecorator={<IconUsers />} />
        <GlobalNavItem startDecorator={<IconHistory />} />
        <GlobalNavItem startDecorator={<IconChartLine />} />
        <GlobalNavItem startDecorator={<IconSettings />} />
        <GlobalNavItem startDecorator={<IconVocabulary />} />
      </GlobalNavList>
    </GlobalNav>
  ),
};
export const Expanded: Story = {
  render: () => (
    <GlobalNav
      endDecorator={
        <GlobalNavProfileMenu
          avatar={<Avatar name="Rhaenyra" />}
          name="Rhaenyra Targaryen"
          organization="Optimizely"
        />
      }
      style={{
        height: "80vh",
      }}
    >
      <GlobalNavList>
        <GlobalNavItem startDecorator={<IconBinaryTree />}>
          Projects
        </GlobalNavItem>
        <GlobalNavItem startDecorator={<IconFlag2 />}>Flags</GlobalNavItem>
        <GlobalNavItem startDecorator={<IconChartInfographic />}>
          Reports
        </GlobalNavItem>
        <GlobalNavItem startDecorator={<IconUsers />}>Audiences</GlobalNavItem>
        <GlobalNavItem startDecorator={<IconHistory />}>History</GlobalNavItem>
        <GlobalNavItem startDecorator={<IconChartLine />}>Events</GlobalNavItem>
        <GlobalNavItem startDecorator={<IconSettings />}>
          Settings
        </GlobalNavItem>
        <GlobalNavItem
          endDecorator={<IconExternalLink />}
          startDecorator={<IconVocabulary />}
        >
          Tutorial
        </GlobalNavItem>
      </GlobalNavList>
    </GlobalNav>
  ),
};

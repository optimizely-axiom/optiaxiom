import type { Meta, StoryObj } from "@storybook/react";

import {
  Avatar,
  GlobalNav,
  GlobalNavBottom,
  GlobalNavItem,
  GlobalNavList,
  GlobalNavProfileMenu,
} from "@optiaxiom/react";

export default {
  component: GlobalNav,
  title: "GlobalNav",
} as Meta<typeof GlobalNav>;

type Story = StoryObj<typeof GlobalNav>;
export const Basic: Story = {
  render: () => (
    <GlobalNav>
      <GlobalNavList>
        <GlobalNavItem label="Projects" />
        <GlobalNavItem label="Flags" />
        <GlobalNavItem label="Reports" />
        <GlobalNavItem label="Audiences" />
        <GlobalNavItem label="History" />
        <GlobalNavItem label="Events" />
        <GlobalNavItem label="Settings" />
        <GlobalNavItem label="Tutorial" />
      </GlobalNavList>
      <GlobalNavBottom>
        <GlobalNavProfileMenu
          avatar={<Avatar name="Rhaenyra" size="sm" />}
          organization="Optimizely"
          username="Rhaenyra Targaryen"
        />
      </GlobalNavBottom>
    </GlobalNav>
  ),
};

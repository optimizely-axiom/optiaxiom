import type { Meta, StoryObj } from "@storybook/react";

import { Toggle } from "@optiaxiom/react";
import { IconLayoutSidebar } from "@tabler/icons-react";

export default {
  argTypes: {
    icon: {
      control: { type: "select" },
      mapping: {
        "layout-sidebar": <IconLayoutSidebar />,
      },
      options: ["layout-sidebar"],
    },
    onClick: { action: "click" },
  },
  args: {
    icon: "layout-sidebar",
  },
  component: Toggle,
} as Meta<typeof Toggle>;

type Story = StoryObj<typeof Toggle>;

export const Basic: Story = {};

export const Pressed: Story = {
  args: {
    defaultPressed: true,
    icon: "layout-sidebar",
  },
};

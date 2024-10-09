import type { Meta, StoryObj } from "@storybook/react";

import { ToggleButton } from "@optiaxiom/react";
import { IconLayoutSidebar } from "@tabler/icons-react";

export default {
  args: {
    icon: "layout-sidebar",
  },
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
  component: ToggleButton,
} as Meta<typeof ToggleButton>;

type Story = StoryObj<typeof ToggleButton>;

export const Basic: Story = {};

export const Pressed: Story = {
  args: {
    defaultPressed: true,
    icon: "layout-sidebar",
  },
};

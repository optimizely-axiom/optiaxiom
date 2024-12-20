import type { Meta, StoryObj } from "@storybook/react";

import { Flex, ToggleButton } from "@optiaxiom/react";
import { IconLayoutSidebar } from "@tabler/icons-react";

export default {
  args: {
    "aria-label": "Toggle sidebar",
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
  render: (args) => (
    <Flex flexDirection="row">
      <ToggleButton {...args} appearance="subtle" />
      <ToggleButton {...args} appearance="default" />
    </Flex>
  ),
} as Meta<typeof ToggleButton>;

type Story = StoryObj<typeof ToggleButton>;

export const Basic: Story = {};

export const Pressed: Story = {
  args: {
    defaultPressed: true,
    icon: "layout-sidebar",
  },
};
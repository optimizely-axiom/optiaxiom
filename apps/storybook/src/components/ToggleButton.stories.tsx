import type { Meta, StoryObj } from "@storybook/react-vite";

import { Group, ToggleButton } from "@optiaxiom/react";
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
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/qs72V79n1s9wYOcZ1TzBwM/Components-V2?node-id=5462:22275",
    },
  },
  render: (args) => (
    <Group gap="16">
      <ToggleButton {...args} appearance="subtle" />
      <ToggleButton {...args} appearance="default" />
    </Group>
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

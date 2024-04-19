import type { Meta, StoryObj } from "@storybook/react";

import { Tooltip } from "@optiaxiom/react";

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  title: "Components / Tooltip",
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Primary: Story = {
  args: {
    children: <button>Hover</button>,
    content: "Add to library",
    side: "top",
    withArrow: false,
  },
};

import type { Meta, StoryObj } from "@storybook/react";

import { Calendar } from "@optiaxiom/react/unstable";

export default {
  args: {
    children: "Label",
  },
  component: Calendar,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/qs72V79n1s9wYOcZ1TzBwM/Components-V2?node-id=5743-27400",
    },
  },
} as Meta<typeof Calendar>;

type Story = StoryObj<typeof Calendar>;

export const Basic: Story = {
  args: {
    defaultValue: new Date("2025-01-22T00:00:00"),
    today: new Date("2025-01-24T00:00:00"),
  },
};

export const OutsideDays: Story = {
  args: {
    defaultValue: new Date("2024-12-30T00:00:00"),
    today: new Date("2025-01-24T00:00:00"),
  },
};

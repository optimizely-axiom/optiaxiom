import type { Meta, StoryObj } from "@storybook/react-vite";

import { Time } from "@optiaxiom/react/unstable";

export default {
  component: Time,
} as Meta<typeof Time>;

type Story = StoryObj<typeof Time>;

export const Basic: Story = {
  args: {
    date: "2025-01-22T14:30:00Z",
  },
};

export const DateObject: Story = {
  args: {
    date: new Date("2025-01-22T14:30:00Z"),
  },
};

export const WithShowTime: Story = {
  args: {
    date: "2025-01-22T14:30:00Z",
    showTime: true,
  },
};

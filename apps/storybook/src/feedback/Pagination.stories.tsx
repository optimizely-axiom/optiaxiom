import type { Meta, StoryObj } from "@storybook/react";

import { Pagination } from "@optiaxiom/react";

export default {
  component: Pagination,
} as Meta<typeof Pagination>;

type Story = StoryObj<typeof Pagination>;

export const Basic: Story = {
  args: {
    dataCount: 50,
  },
};

export const PageSize: Story = {
  args: {
    dataCount: 50,
    showPageSize: true,
  },
};

export const MassiveData: Story = {
  args: {
    dataCount: 300,
    offset: 120,
  },
};

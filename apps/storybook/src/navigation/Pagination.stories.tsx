import type { Meta, StoryObj } from "@storybook/react";

import { Pagination, type PaginationProps } from "@optiaxiom/react";
import { useState } from "react";

export default {
  args: {
    page: 1,
    total: 50,
  },
  component: Pagination,
  render: function Template(args: PaginationProps) {
    const [offset, setOffset] = useState(args.page);

    return <Pagination {...args} onChange={setOffset} page={offset} />;
  },
} as Meta<typeof Pagination>;

type Story = StoryObj<typeof Pagination>;

export const Basic: Story = {};

export const Boundaries: Story = {
  args: {
    boundaries: 2,
    page: 10,
  },
};

export const Siblings: Story = {
  args: {
    page: 10,
    siblings: 3,
  },
};

export const LargeDataset: Story = {
  args: {
    total: 1000,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

import type { Meta, StoryObj } from "@storybook/react";

import { Pagination } from "@optiaxiom/react";
import { useState } from "react";

export default {
  component: Pagination,
} as Meta<typeof Pagination>;

type Story = StoryObj<typeof Pagination>;

export const Basic: Story = {
  args: {
    total: 50,
  },
};

export const MassiveData: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [offset, setOffset] = useState(100);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [pageSize, setPageSize] = useState(20);
    // const pageSize = 20;

    const onPageSelect = (newOffset: number, newPageSize: number) => {
      setOffset(newOffset);
      setPageSize(newPageSize);
    };

    return (
      <Pagination
        {...args}
        offset={args.offset ?? offset}
        onChange={args.onChange || onPageSelect}
        pageSize={args.pageSize ?? pageSize}
        total={args.total ?? 300}
      />
    );
  },
};

import type { Meta, StoryObj } from "@storybook/react";

import { Box, Pagination, type PaginationProps, Text } from "@optiaxiom/react";
import { useState } from "react";

export default {
  component: Pagination,
} as Meta<typeof Pagination>;

type Story = StoryObj<typeof Pagination>;

const PaginationTemplate = (args: PaginationProps) => {
  const [offset, setOffset] = useState(args.offset ?? 0);
  const [pageSize, setPageSize] = useState(args.pageSize ?? 20);

  const onPageSelect = (newOffset: number, newPageSize: number) => {
    setOffset(newOffset);
    setPageSize(newPageSize);
  };

  return (
    <Box>
      <Text fontSize="md">Data Size: {args.total}</Text>
      <Text fontSize="md">Page Size: {pageSize}</Text>
      <Text fontSize="md">Offset: {offset}</Text>
      <Pagination
        mt="md"
        {...args}
        offset={offset}
        onChange={args.onChange || onPageSelect}
        pageSize={pageSize}
      />
    </Box>
  );
};

export const Basic: Story = {
  args: {
    total: 50,
  },
  render: PaginationTemplate,
};

export const CustomBoundaries: Story = {
  args: {
    boundaries: 2,
    offset: 100,
    total: 500,
  },
  render: PaginationTemplate,
};

export const CustomSiblings: Story = {
  args: {
    offset: 200,
    siblings: 3,
    total: 500,
  },
  render: PaginationTemplate,
};

export const LargeDataset: Story = {
  args: {
    total: 1000,
  },
  render: PaginationTemplate,
};

export const CustomPageSize: Story = {
  args: {
    pageSize: 5,
    total: 50,
  },
  render: PaginationTemplate,
};

export const DisabledState: Story = {
  args: {
    disabled: true,
    total: 50,
  },
  render: PaginationTemplate,
};

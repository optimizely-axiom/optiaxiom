import type { Meta, StoryObj } from "@storybook/react";

import { Box, Pagination, type PaginationProps, Text } from "@optiaxiom/react";
import { useState } from "react";

export default {
  component: Pagination,
} as Meta<typeof Pagination>;

type Story = StoryObj<typeof Pagination>;

const PaginationTemplate = (args: PaginationProps) => {
  const [offset, setOffset] = useState(args.offset ?? 1);

  const onPageSelect = (newOffset: number) => {
    setOffset(newOffset);
  };

  return (
    <Box>
      <Text fontSize="md">Data Size: {args.total}</Text>
      <Text fontSize="md">Offset: {offset}</Text>
      <Pagination
        mt="md"
        {...args}
        offset={offset}
        onChange={args.onChange || onPageSelect}
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

import type { Meta, StoryObj } from "@storybook/react";

import { Pagination, type PaginationProps } from "@optiaxiom/react";
import { expect, userEvent } from "@storybook/test";
import { useState } from "react";

export default {
  args: {
    total: 50,
  },
  argTypes: {
    onPageChange: { action: "pageChange" },
  },
  component: Pagination,
} as Meta<typeof Pagination>;

type Story = StoryObj<typeof Pagination>;

export const Basic: Story = {};

export const Controlled: Story = {
  play: async ({ canvas }) => {
    await expect(
      await canvas.findByRole("button", { name: "page 1 (first page)" }),
    ).toHaveAttribute("aria-current", "page");
    await userEvent.click(
      await canvas.findByRole("button", { name: "Next page" }),
    );
    await expect(
      await canvas.findByRole("button", { name: "page 1 (first page)" }),
    ).not.toHaveAttribute("aria-current", "page");
    await expect(
      await canvas.findByRole("button", { name: "page 2" }),
    ).toHaveAttribute("aria-current", "page");
  },
  render: function Template(args: PaginationProps) {
    const [offset, setOffset] = useState(args.page);

    return <Pagination {...args} onPageChange={setOffset} page={offset} />;
  },
};

export const Boundaries: Story = {
  args: {
    boundaries: 2,
    defaultPage: 10,
  },
};

export const Siblings: Story = {
  args: {
    defaultPage: 10,
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

import type { Meta, StoryObj } from "@storybook/react-vite";

import { AxiomProvider, Pagination } from "@optiaxiom/react";
import { de } from "@optiaxiom/react/locale/de";
import { ja } from "@optiaxiom/react/locale/ja";
import { useState } from "react";
import { expect, userEvent } from "storybook/test";

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
  args: {
    page: 1,
  },
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
  render: function Template(args) {
    const [offset, setOffset] = useState(args.page);
    return <Pagination {...args} onPageChange={setOffset} page={offset} />;
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

export const Locale: Story = {
  args: {
    defaultPage: 1,
  },
  parameters: {
    useAxiomProvider: false,
  },
  play: async ({ canvas }) => {
    await expect(
      await canvas.findByRole("navigation", { name: "Seitennavigation" }),
    ).toBeInTheDocument();
    await expect(
      await canvas.findByRole("button", { name: "Seite 1 (erste Seite)" }),
    ).toHaveAttribute("aria-current", "page");
    await userEvent.click(
      await canvas.findByRole("button", { name: "Nächste Seite" }),
    );
    await expect(
      await canvas.findByRole("button", { name: "Seite 2" }),
    ).toHaveAttribute("aria-current", "page");
  },
  render: (args) => (
    <AxiomProvider locale={de}>
      <Pagination {...args} />
    </AxiomProvider>
  ),
};

export const JapaneseLocale: Story = {
  args: {
    defaultPage: 1,
  },
  parameters: {
    useAxiomProvider: false,
  },
  play: async ({ canvas }) => {
    await expect(
      await canvas.findByRole("button", { name: "1ページ (最初のページ)" }),
    ).toHaveAttribute("aria-current", "page");
  },
  render: (args) => (
    <AxiomProvider locale={ja}>
      <Pagination {...args} />
    </AxiomProvider>
  ),
};

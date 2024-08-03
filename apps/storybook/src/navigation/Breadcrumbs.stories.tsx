import type { Meta, StoryObj } from "@storybook/react";

import { Breadcrumbs } from "@optiaxiom/react";

export default {
  argTypes: {
    colorScheme: {
      control: "select",
      options: ["neutral", "primary", "secondary"],
    },
  },
  component: Breadcrumbs,
  title: "Components/Breadcrumbs",
} as Meta<typeof Breadcrumbs>;

type Story = StoryObj<typeof Breadcrumbs>;

const Template: Story = {
  render: (args) => <Breadcrumbs {...args} />,
};

export const Default: Story = {
  ...Template,
  args: {
    colorScheme: "primary",
    items: [
      { href: "/", label: "Home" },
      { href: "/products", label: "Products" },
      { href: "/products/electronics", label: "Electronics" },
    ],
  },
};

export const LongBreadcrumb: Story = {
  ...Template,
  args: {
    colorScheme: "primary",
    items: [
      { href: "/", label: "Home" },
      { href: "/category", label: "Category" },
      { href: "/category/subcategory", label: "Subcategory" },
      { href: "/category/subcategory/product-type", label: "Product Type" },
      {
        href: "/category/subcategory/product-type/specific-product",
        label: "Specific Product",
      },
    ],
  },
};

export const CustomSeparator: Story = {
  ...Template,
  args: {
    colorScheme: "primary",
    items: [
      { href: "/", label: "Home" },
      { href: "/products", label: "Products" },
      { href: "/products/electronics", label: "Electronics" },
    ],
    separator: ">",
  },
};

export const NeutralColorScheme: Story = {
  ...Template,
  args: {
    colorScheme: "neutral",
    items: [
      { href: "/", label: "Home" },
      { href: "/products", label: "Products" },
      { href: "/products/electronics", label: "Electronics" },
    ],
  },
};

export const SecondaryColorScheme: Story = {
  ...Template,
  args: {
    colorScheme: "secondary",
    items: [
      { href: "/", label: "Home" },
      { href: "/products", label: "Products" },
      { href: "/products/electronics", label: "Electronics" },
    ],
  },
};

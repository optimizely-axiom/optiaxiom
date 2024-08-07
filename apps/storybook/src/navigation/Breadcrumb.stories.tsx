import type { Meta, StoryObj } from "@storybook/react";

import { Breadcrumb, BreadcrumbItem } from "@optiaxiom/react";

export default {
  component: Breadcrumb,
} as Meta<typeof Breadcrumb>;

type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  args: {
    items: [
      { href: "/", label: "Home" },
      { href: "/products", label: "Products" },
      { href: "/products/electronics", label: "Electronics" },
    ],
  },
};

export const LongBreadcrumb: Story = {
  args: {
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
export const LongBreadcrumbWithMaxItems: Story = {
  args: {
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
    maxItems: 2,
  },
};

export const CustomSeparator: Story = {
  args: {
    items: [
      { href: "/", label: "Home" },
      { href: "/products", label: "Products" },
      { href: "/products/electronics", label: "Electronics" },
    ],
    separator: "/",
  },
};

export const UsingChildren: Story = {
  render: (args) => (
    <Breadcrumb {...args}>
      <BreadcrumbItem href="/" label="Home" />
      <BreadcrumbItem href="/products" label="Products" />
      <BreadcrumbItem href="/products/electronics" label="Electronics" />
    </Breadcrumb>
  ),
};

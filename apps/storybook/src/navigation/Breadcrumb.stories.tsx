import type { Meta, StoryObj } from "@storybook/react";

import { Breadcrumb, BreadcrumbItem } from "@optiaxiom/react";

export default {
  component: Breadcrumb,
} as Meta<typeof Breadcrumb>;

type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  render: (args) => (
    <Breadcrumb {...args}>
      <BreadcrumbItem href="/" label="Home" />
      <BreadcrumbItem href="/products" label="Products" />
      <BreadcrumbItem href="/products/electronics" label="Electronics" />
    </Breadcrumb>
  ),
};

export const LongBreadcrumb: Story = {
  render: (args) => (
    <Breadcrumb {...args}>
      <BreadcrumbItem href="/" label="Home" />
      <BreadcrumbItem href="/category" label="Category" />
      <BreadcrumbItem href="/category/subcategory" label="Subcategory" />
      <BreadcrumbItem
        href="/category/subcategory/product-type"
        label="Product Type"
      />
      <BreadcrumbItem
        href="/category/subcategory/product-type/specific-product"
        label="Specific Product"
      />
    </Breadcrumb>
  ),
};
export const LongBreadcrumbWithMaxItems: Story = {
  args: {
    maxItems: 2,
  },
  render: (args) => (
    <Breadcrumb {...args}>
      <BreadcrumbItem href="/" label="Home" />
      <BreadcrumbItem href="/category" label="Category" />
      <BreadcrumbItem href="/category/subcategory" label="Subcategory" />
      <BreadcrumbItem
        href="/category/subcategory/product-type"
        label="Product Type"
      />
      <BreadcrumbItem
        href="/category/subcategory/product-type/specific-product"
        label="Specific Product"
      />
      <BreadcrumbItem
        href="/category/subcategory/product-type"
        label="Product Type"
      />
      <BreadcrumbItem
        href="/category/subcategory/product-type/specific-product"
        label="Specific Product"
      />
    </Breadcrumb>
  ),
};

export const CustomSeparator: Story = {
  args: {
    separator: "/",
  },
  render: (args) => (
    <Breadcrumb {...args}>
      <BreadcrumbItem href="/" label="Home" />
      <BreadcrumbItem href="/products" label="Products" />
      <BreadcrumbItem href="/products/electronics" label="Electronics" />
    </Breadcrumb>
  ),
};

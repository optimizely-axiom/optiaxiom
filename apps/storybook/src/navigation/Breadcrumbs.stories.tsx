import type { Meta, StoryObj } from "@storybook/react";

import { BreadcrumbItem, Breadcrumbs } from "@optiaxiom/react";

export default {
  component: Breadcrumbs,
} as Meta<typeof Breadcrumbs>;

type Story = StoryObj<typeof Breadcrumbs>;

export const Basic: Story = {
  render: (args) => (
    <Breadcrumbs {...args}>
      <BreadcrumbItem href="/" label="Home" />
      <BreadcrumbItem href="/products" label="Products" />
      <BreadcrumbItem href="/products/electronics" label="Electronics" />
    </Breadcrumbs>
  ),
};

export const Collapse: Story = {
  args: {
    maxItems: 2,
  },
  render: (args) => (
    <Breadcrumbs {...args}>
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
    </Breadcrumbs>
  ),
};

export const Separator: Story = {
  args: {
    separator: "/",
  },
  render: (args) => (
    <Breadcrumbs {...args}>
      <BreadcrumbItem href="/" label="Home" />
      <BreadcrumbItem href="/products" label="Products" />
      <BreadcrumbItem href="/products/electronics" label="Electronics" />
    </Breadcrumbs>
  ),
};

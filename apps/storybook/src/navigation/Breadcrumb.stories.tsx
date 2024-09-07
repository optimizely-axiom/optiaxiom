import type { Meta, StoryObj } from "@storybook/react";

import { Breadcrumb, BreadcrumbItem } from "@optiaxiom/react/unstable";
// import { IconChevronRight } from "@tabler/icons-react";

export default {
  args: {
    children: [
      <BreadcrumbItem href="/" key="/">
        Home
      </BreadcrumbItem>,
      <BreadcrumbItem href="/category" key="/category">
        Category
      </BreadcrumbItem>,
      <BreadcrumbItem href="/category/subcategory" key="/category/subcategory">
        Subcategory
      </BreadcrumbItem>,
      <BreadcrumbItem
        href="/category/subcategory/product-type"
        key="/category/subcategory/product-type"
      >
        Product Type
      </BreadcrumbItem>,
      <BreadcrumbItem
        href="/category/subcategory/product-type/specific-product"
        key="/category/subcategory/product-type/specific-product"
      >
        Specific Product
      </BreadcrumbItem>,
    ],
  },
  component: Breadcrumb,
} as Meta<typeof Breadcrumb>;

type Story = StoryObj<typeof Breadcrumb>;

export const Basic: Story = {};

export const Collapse: Story = {
  args: {
    // maxItems: 2,
  },
};

export const Separator: Story = {
  args: {
    // separator: <IconChevronRight />,
  },
};

import type { Meta, StoryObj } from "@storybook/react";

import { BreadcrumbItem, Breadcrumbs } from "@optiaxiom/react";
import { IconChevronRight } from "@tabler/icons-react";

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
  component: Breadcrumbs,
} as Meta<typeof Breadcrumbs>;

type Story = StoryObj<typeof Breadcrumbs>;

export const Basic: Story = {};

export const Collapse: Story = {
  args: {
    maxItems: 2,
  },
};

export const Separator: Story = {
  args: {
    separator: <IconChevronRight />,
  },
};

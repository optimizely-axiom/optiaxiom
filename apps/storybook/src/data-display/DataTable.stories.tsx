import type { Meta, StoryObj } from "@storybook/react";

import { Box } from "@optiaxiom/react";
import {
  type ColumnDef,
  DataTable,
  DataTableHeader,
} from "@optiaxiom/react/unstable";

type Payment = {
  amount: number;
  createdAt: string;
  customerName: string;
  email: string;
  id: string;
  lastModifiedBy: string;
  paymentMethod: string;
  productName: string;
  quantity: number;
  refundStatus: string;
  shippingMethod: string;
  status: string;
  tags: string[];
  totalPrice: number;
  trackingNumber: string;
};

const meta: Meta<typeof DataTable> = {
  component: DataTable,
};

export default meta;

type Story = StoryObj<typeof DataTable<Payment, string>>;

const columns: ColumnDef<Payment, string>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    enableSorting: true,
    header: "Email",
  },
  {
    accessorKey: "amount",
    cell: ({ row }) => {
      const amount = row.getValue("amount");
      const formatted = new Intl.NumberFormat("en-US", {
        currency: "USD",
        style: "currency",
      }).format(typeof amount === "number" ? amount : 0);
      return <Box textAlign="end">{formatted}</Box>;
    },
    enableSorting: true,
    header: (props) => (
      <DataTableHeader variant="number" {...props}>
        Amount
      </DataTableHeader>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "customerName",
    header: "Customer Name",
  },
  {
    accessorKey: "productName",
    header: "Product Name",
  },
  {
    accessorKey: "quantity",
    cell: ({ row }) => <Box textAlign="end">{row.getValue("quantity")}</Box>,
    header: (props) => (
      <DataTableHeader variant="number" {...props}>
        Quantity
      </DataTableHeader>
    ),
  },
  {
    accessorKey: "totalPrice",
    cell: ({ row }) => {
      const total = row.getValue("totalPrice");
      const formatted = new Intl.NumberFormat("en-US", {
        currency: "USD",
        style: "currency",
      }).format(typeof total === "number" ? total : 0);
      return <Box textAlign="end">{formatted}</Box>;
    },
    header: (props) => (
      <DataTableHeader variant="number" {...props}>
        TotalPrice
      </DataTableHeader>
    ),
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
  },
  {
    accessorKey: "shippingMethod",
    header: "Shipping Method",
  },
  {
    accessorKey: "trackingNumber",
    header: "Tracking Number",
  },
  {
    accessorKey: "refundStatus",
    header: "Refund Status",
  },
  {
    accessorKey: "tags",
    cell: ({ row }) => (
      <Box>{(row.getValue("tags") as string[])?.join(", ")}</Box>
    ),
    header: "Tags",
  },
  {
    accessorKey: "lastModifiedBy",
    header: "Last Modified By",
  },
];

const sampleData: Payment[] = [
  {
    amount: 316,
    createdAt: "2023-06-01T10:00:00Z",
    customerName: "Ken Thompson",
    email: "ken99@yahoo.com",
    id: "m5gr84i9",
    lastModifiedBy: "System",
    paymentMethod: "Credit Card",
    productName: "Ergonomic Keyboard",
    quantity: 1,
    refundStatus: "N/A",
    shippingMethod: "Standard",
    status: "success",
    tags: ["electronics", "office"],
    totalPrice: 316,
    trackingNumber: "1Z999AA1234567890",
  },
  {
    amount: 529.99,
    createdAt: "2023-06-02T14:30:00Z",
    customerName: "Sarah Lee",
    email: "sarah.lee@gmail.com",
    id: "3u1reuv4",
    lastModifiedBy: "Sarah Johnson (Sales Rep)",
    paymentMethod: "PayPal",
    productName: "4K Ultra HD Smart TV",
    quantity: 1,
    refundStatus: "N/A",
    shippingMethod: "Express",
    status: "processing",
    tags: ["electronics", "home entertainment"],
    totalPrice: 529.99,
    trackingNumber: "1Z999BB9876543210",
  },
];

export const Basic: Story = {
  args: {
    columns: columns.slice(0, 5),
    data: sampleData,
  },
};

export const VerticalScroll: Story = {
  args: {
    columns: columns,
    data: sampleData,
  },
};

export const Pinned: Story = {
  args: {
    columns: columns,
    data: sampleData,
    pinnedColumns: ["id", "status"],
  },
};

export const EmptyRows: Story = {
  args: {
    columns: columns.slice(0, 5),
    data: [],
  },
};

export const Pagination: Story = {
  args: {
    columns: columns,
    data: Array.from({ length: 300 }, (_, i) => ({
      amount: Math.floor(Math.random() * 1000) + 50,
      createdAt: new Date(
        Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
      ).toISOString(),
      customerName: `Customer ${i + 1}`,
      email: `person${Math.floor(Math.random() * 10000)}@example.com`,
      id: `id-${i + 1}`,
      lastModifiedBy: `User ${Math.floor(Math.random() * 10) + 1}`,
      paymentMethod: ["Credit Card", "PayPal", "Bank Transfer"][
        Math.floor(Math.random() * 3)
      ],
      productName: `Product ${i + 1}`,
      quantity: Math.floor(Math.random() * 5) + 1,
      refundStatus: ["N/A", "Partial", "Full"][Math.floor(Math.random() * 3)],
      shippingMethod: ["Standard", "Express", "Next Day"][
        Math.floor(Math.random() * 3)
      ],
      status: ["success", "processing", "failed", "refunded"][
        Math.floor(Math.random() * 4)
      ],
      tags: ["tag1", "tag2", "tag3"].slice(
        0,
        Math.floor(Math.random() * 3) + 1,
      ),
      totalPrice: Math.floor(Math.random() * 1000) + 50,
      trackingNumber: `TN${Math.random().toString(36).substr(2, 9)}`,
    })),
    pinnedColumns: ["id"],
  },
};

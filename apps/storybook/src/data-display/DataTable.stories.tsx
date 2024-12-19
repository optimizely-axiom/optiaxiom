import type { Meta, StoryObj } from "@storybook/react";

import { Box } from "@optiaxiom/react";
import { DataTable } from "@optiaxiom/react/unstable";
import {
  type ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

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
  args: {
    style: { maxHeight: "calc(100dvh - 2rem)" },
  },
  component: DataTable,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof DataTable>;

const columns: ColumnDef<Payment>[] = [
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
    header: "Amount",
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
    header: "Quantity",
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
    header: "Total Price",
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

const data = [
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

const largeData = Array.from({ length: 100 }, (_, i) => {
  const orderNum = (i + 1).toString().padStart(3, "0");

  const paymentMethods = ["Credit Card", "PayPal", "Bank Transfer"];
  const shippingMethods = ["Standard", "Express", "Next Day"];
  const statuses = ["success", "processing", "failed", "refunded"];
  const refundStatuses = ["N/A", "Partial", "Full"];

  const paymentMethod = paymentMethods[i % 3];
  const shippingMethod = shippingMethods[i % 3];
  const status = statuses[i % 4];
  const refundStatus = refundStatuses[i % 3];
  const date = new Date(2024, 1, 1 + Math.floor(i / 4));

  const basePrice = 100;
  const price = basePrice + i * 10;

  return {
    amount: price,
    createdAt: date.toISOString(),
    customerName: `Customer ${orderNum}`,
    email: `customer${orderNum}@example.com`,
    id: `order-${orderNum}`,
    lastModifiedBy: `Agent ${1 + (i % 5)}`,
    paymentMethod,
    productName: `Product ${orderNum}`,
    quantity: 1 + (i % 3),
    refundStatus,
    shippingMethod,
    status,
    tags: i % 2 === 0 ? ["electronics"] : ["electronics", "premium"],
    totalPrice: price * (1 + (i % 3)),
    trackingNumber: `TN${orderNum}${(i % 100).toString().padStart(3, "0")}`,
  };
});

export const Basic: Story = {
  render: function Render(args) {
    return (
      <DataTable
        {...args}
        table={useReactTable({
          columns: columns.slice(0, 5),
          data,
          getCoreRowModel: getCoreRowModel(),
        })}
      />
    );
  },
};

export const VerticalScroll: Story = {
  render: function Render(args) {
    return (
      <DataTable
        {...args}
        table={useReactTable({
          columns: columns.slice(0, 5),
          data: largeData,
          getCoreRowModel: getCoreRowModel(),
          state: { pagination: { pageIndex: 0, pageSize: 100 } },
        })}
      />
    );
  },
};

export const Pinned: Story = {
  render: function Render(args) {
    return (
      <DataTable
        {...args}
        table={useReactTable({
          columns: columns,
          data: largeData,
          getCoreRowModel: getCoreRowModel(),
          state: {
            columnPinning: { left: ["id", "status"] },
            pagination: { pageIndex: 0, pageSize: 100 },
          },
        })}
      />
    );
  },
};

export const EmptyRows: Story = {
  render: function Render(args) {
    return (
      <DataTable
        {...args}
        table={useReactTable({
          columns: columns.slice(0, 5),
          data: [],
          getCoreRowModel: getCoreRowModel(),
        })}
      />
    );
  },
};

export const Pagination: Story = {
  render: function Render(args) {
    return (
      <DataTable
        {...args}
        table={useReactTable({
          columns: columns,
          data: largeData,
          getCoreRowModel: getCoreRowModel(),
          getPaginationRowModel: getPaginationRowModel(),
          getSortedRowModel: getSortedRowModel(),
        })}
      />
    );
  },
};

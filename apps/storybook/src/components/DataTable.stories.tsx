import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Checkbox,
  DataTable,
  DataTableBody,
  DataTableFooter,
} from "@optiaxiom/react";
import {
  DataTableExpandableCell,
  DataTableExpandableHeader,
} from "@optiaxiom/react/unstable";
import {
  type ColumnDef,
  getCoreRowModel,
  getExpandedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useRef, useState } from "react";

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
    cell: ({ row }) => (
      <Checkbox
        aria-label="Select row"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
    header: ({ table }) => (
      <Checkbox
        aria-label="Select all"
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={table.getIsSomePageRowsSelected()}
        onChange={table.getToggleAllPageRowsSelectedHandler()}
      />
    ),
    id: "select",
    size: 48,
  },
  {
    accessorKey: "id",
    enableResizing: true,
    header: "ID",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    enableResizing: true,
    enableSorting: true,
    header: "Email",
  },
  {
    accessorFn: (row) => {
      const amount = row.amount;
      const formatted = new Intl.NumberFormat("en-US", {
        currency: "USD",
        style: "currency",
      }).format(typeof amount === "number" ? amount : 0);
      return formatted;
    },
    accessorKey: "amount",
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
    header: "Quantity",
  },
  {
    accessorFn: (row) => {
      const total = row.totalPrice;
      const formatted = new Intl.NumberFormat("en-US", {
        currency: "USD",
        style: "currency",
      }).format(typeof total === "number" ? total : 0);
      return formatted;
    },
    accessorKey: "totalPrice",
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
    accessorFn: (row) => row.tags.join(", "),
    accessorKey: "tags",
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
      >
        <DataTableBody />
      </DataTable>
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
      >
        <DataTableBody />
      </DataTable>
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
            columnPinning: {
              left: ["select", "id", "status"],
              right: ["lastModifiedBy"],
            },
            pagination: { pageIndex: 0, pageSize: 100 },
          },
        })}
      >
        <DataTableBody />
      </DataTable>
    );
  },
};

export const ExpandingRows: Story = {
  render: function Render(args) {
    const [expanded, setExpanded] = useState({});
    const [flatRows, setFlatRows] = useState(
      data.map((row) => ({
        ...row,
        parent: "0",
      })),
    );
    const rows = useMemo(
      () => flatRows.filter((row) => row.parent === "0"),
      [flatRows],
    );
    const [loading, setLoading] = useState<Record<string, boolean>>({});
    const indexRef = useRef(0);

    return (
      <DataTable
        {...args}
        table={useReactTable({
          columns: [
            columns[0],
            {
              accessorKey: "id",
              cell: DataTableExpandableCell,
              enableResizing: true,
              header: () => (
                <DataTableExpandableHeader>ID</DataTableExpandableHeader>
              ),
            },
            ...columns.slice(2, 5),
          ],
          data: rows,
          getCoreRowModel: getCoreRowModel(),
          getExpandedRowModel: getExpandedRowModel(),
          getRowCanExpand: (row) => row.depth < 2,
          getRowId: (row) => row.id,
          getSubRows: (row) => flatRows.filter((r) => r.parent === row.id),
          onExpandedChange: (updater) => {
            const newExpanded =
              typeof updater === "function" ? updater(expanded) : updater;
            setExpanded(newExpanded);

            if (newExpanded === true) {
              return;
            }

            const newLoading = { ...loading };
            for (const key in newExpanded) {
              if (!(key in newLoading)) {
                newLoading[key] = true;
                setTimeout(() => {
                  setFlatRows((flatRows) => [
                    ...flatRows,
                    ...Array.from({ length: 3 }).map(() => ({
                      ...largeData[indexRef.current++],
                      parent: key,
                    })),
                  ]);
                  setLoading((loading) => ({
                    ...loading,
                    [key]: false,
                  }));
                }, 1000);
              }
            }
            setLoading(newLoading);
          },
          state: {
            expanded,
          },
        })}
      >
        <DataTableBody loading={loading} />
      </DataTable>
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
      >
        <DataTableBody />
      </DataTable>
    );
  },
};

export const LoadingState: Story = {
  render: function Render(args) {
    return (
      <DataTable
        {...args}
        table={useReactTable({
          columns: columns.slice(0, 5),
          data,
          getCoreRowModel: getCoreRowModel(),
        })}
      >
        <DataTableBody loading />
      </DataTable>
    );
  },
};

export const Pagination: Story = {
  render: function Render(args) {
    const table = useReactTable({
      columns: columns,
      data: largeData,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
    });
    return (
      <DataTable {...args} table={table}>
        <DataTableBody />
        <DataTableFooter showPageSizeOptions />
      </DataTable>
    );
  },
};

export const Resizing: Story = {
  play: async ({ canvas }) => {
    canvas.getByRole("columnheader", { name: "Email" }).focus();
  },
  render: function Render(args) {
    return (
      <DataTable
        {...args}
        table={useReactTable({
          columnResizeMode: "onEnd",
          columns: columns.slice(0, 5),
          data,
          getCoreRowModel: getCoreRowModel(),
        })}
      >
        <DataTableBody />
      </DataTable>
    );
  },
};

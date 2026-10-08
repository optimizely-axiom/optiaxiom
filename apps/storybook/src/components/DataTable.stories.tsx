import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Button,
  Checkbox,
  DataTable,
  DataTableAction,
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
import { useEffect, useMemo, useRef, useState } from "react";
import { expect, userEvent, waitFor, within } from "storybook/test";

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
    enableResizing: false,
    enableSorting: false,
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
    enableSorting: false,
    header: "ID",
  },
  {
    accessorKey: "status",
    enableResizing: false,
    enableSorting: false,
    header: "Status",
  },
  {
    accessorKey: "email",
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
    enableResizing: false,
    header: "Amount",
  },
  {
    accessorKey: "createdAt",
    enableResizing: false,
    enableSorting: false,
    header: "Created At",
  },
  {
    accessorKey: "customerName",
    enableResizing: false,
    enableSorting: false,
    header: "Customer Name",
  },
  {
    accessorKey: "productName",
    enableResizing: false,
    enableSorting: false,
    header: "Product Name",
  },
  {
    accessorKey: "quantity",
    enableResizing: false,
    enableSorting: false,
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
    enableResizing: false,
    enableSorting: false,
    header: "Total Price",
  },
  {
    accessorKey: "paymentMethod",
    enableResizing: false,
    enableSorting: false,
    header: "Payment Method",
  },
  {
    accessorKey: "shippingMethod",
    enableResizing: false,
    enableSorting: false,
    header: "Shipping Method",
  },
  {
    accessorKey: "trackingNumber",
    enableResizing: false,
    enableSorting: false,
    header: "Tracking Number",
  },
  {
    accessorKey: "refundStatus",
    enableResizing: false,
    enableSorting: false,
    header: "Refund Status",
  },
  {
    accessorFn: (row) => row.tags.join(", "),
    accessorKey: "tags",
    enableResizing: false,
    enableSorting: false,
    header: "Tags",
  },
  {
    accessorKey: "lastModifiedBy",
    enableResizing: false,
    enableSorting: false,
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
  play: async ({ canvas }) => {
    const table = canvas.getByRole("table");
    await expect(table).toHaveAttribute("aria-rowcount", "101");
    await expect(canvas.getAllByRole("row").length).toBeLessThan(101);
    await expect(canvas.getAllByRole("row")[1]).toHaveAttribute(
      "aria-rowindex",
      "2",
    );

    const scrollContainer = table.parentElement!;
    scrollContainer.scrollTop = scrollContainer.scrollHeight;
    await waitFor(() =>
      expect(canvas.getAllByRole("row").at(-1)).toHaveAttribute(
        "aria-rowindex",
        "101",
      ),
    );
    scrollContainer.scrollTop = 0;
  },
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

export const KeyboardFocusWhileScrolled: Story = {
  play: async ({ canvas }) => {
    const firstRow = canvas.getAllByRole("row")[1];
    firstRow.focus();

    const scrollContainer = canvas.getByRole("table").parentElement!;
    scrollContainer.scrollTop = scrollContainer.scrollHeight;
    await waitFor(() =>
      expect(canvas.getAllByRole("row").at(-1)).toHaveAttribute(
        "aria-rowindex",
        "101",
      ),
    );
    await expect(firstRow).toHaveFocus();

    await userEvent.keyboard("{ArrowDown}");
    await waitFor(() =>
      expect(document.activeElement).toHaveAttribute("aria-rowindex", "3"),
    );
  },
  render: function Render(args) {
    return (
      <DataTable
        {...args}
        table={useReactTable({
          columns: [
            {
              cell: ({ row }) => (
                <DataTableAction primary>
                  <Button>{row.original.id}</Button>
                </DataTableAction>
              ),
              header: "ID",
              id: "id",
            },
            ...columns.slice(2, 5),
          ],
          data: largeData,
          getCoreRowModel: getCoreRowModel(),
        })}
      >
        <DataTableBody />
      </DataTable>
    );
  },
};

export const PaginatingKeepsFocus: Story = {
  play: async ({ canvas }) => {
    canvas.getAllByRole("row")[3].focus();
    await userEvent.click(canvas.getByRole("button", { name: "Next page" }));
    await waitFor(() =>
      expect(canvas.getAllByRole("row")[3]).toHaveTextContent("order-013"),
    );
    await expect(
      canvas.getByRole("button", { name: "Next page" }),
    ).toHaveFocus();
  },
  render: function Render(args) {
    return (
      <DataTable
        {...args}
        table={useReactTable({
          columns: [
            {
              cell: ({ row }) => (
                <DataTableAction primary>
                  <Button>{row.original.id}</Button>
                </DataTableAction>
              ),
              header: "ID",
              id: "id",
            },
            ...columns.slice(2, 5),
          ],
          data: largeData,
          getCoreRowModel: getCoreRowModel(),
          getPaginationRowModel: getPaginationRowModel(),
          initialState: { pagination: { pageSize: 10 } },
        })}
      >
        <DataTableBody />
        <DataTableFooter />
      </DataTable>
    );
  },
};

export const ArrowKeysFollowRowAfterDataChange: Story = {
  play: async ({ canvas }) => {
    const rowOf = (id: string) =>
      canvas.getByRole("button", { name: id }).closest("tr")!;
    rowOf("order-005").focus();

    // Rows arriving from the server shift the focused row down.
    window.dispatchEvent(new Event("insertrow"));
    await waitFor(() =>
      expect(rowOf("order-005")).toHaveAttribute("aria-rowindex", "7"),
    );
    await expect(rowOf("order-005")).toHaveFocus();

    await userEvent.keyboard("{ArrowDown}");
    await waitFor(() => expect(rowOf("order-006")).toHaveFocus());
  },
  render: function Render(args) {
    const [rows, setRows] = useState(() => largeData.slice(0, 10));
    useEffect(() => {
      const onInsert = () =>
        setRows((rows) => [{ ...rows[0], id: "order-new" }, ...rows]);
      window.addEventListener("insertrow", onInsert);
      return () => window.removeEventListener("insertrow", onInsert);
    }, []);

    return (
      <DataTable
        {...args}
        table={useReactTable({
          columns: [
            {
              cell: ({ row }) => (
                <DataTableAction primary>
                  <Button>{row.original.id}</Button>
                </DataTableAction>
              ),
              header: "ID",
              id: "id",
            },
          ],
          data: rows,
          getCoreRowModel: getCoreRowModel(),
          getRowId: (row) => row.id,
        })}
      >
        <DataTableBody />
      </DataTable>
    );
  },
};

const manyColumns: ColumnDef<Payment>[] = Array.from(
  { length: 30 },
  (_, i) => ({
    accessorFn: (row) => `${row.id} / ${i + 1}`,
    header: `Column ${i + 1}`,
    id: `column${i + 1}`,
  }),
);

export const VirtualizedColumns: Story = {
  play: async ({ canvas }) => {
    const table = canvas.getByRole("table");
    await expect(table).toHaveAttribute("aria-colcount", "30");

    const scrollContainer = table.parentElement!;
    scrollContainer.scrollLeft = scrollContainer.scrollWidth;
    await waitFor(() =>
      expect(
        canvas.getByRole("cell", { name: "order-001 / 30" }),
      ).toHaveAttribute("aria-colindex", "30"),
    );
    await expect(
      canvas.queryByRole("cell", { name: "order-001 / 2" }),
    ).not.toBeInTheDocument();
    // The spacer standing in for unrendered columns has no column index.
    for (const cell of within(canvas.getAllByRole("row")[1]).getAllByRole(
      "cell",
    )) {
      await expect(cell).toHaveAttribute("aria-colindex");
    }
    scrollContainer.scrollLeft = 0;
  },
  render: function Render(args) {
    return (
      <DataTable
        {...args}
        table={useReactTable({
          columns: manyColumns,
          data: largeData,
          getCoreRowModel: getCoreRowModel(),
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
    const [loading, setLoading] = useState<Record<string, "sub-rows" | false>>(
      {},
    );
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
              enableResizing: false,
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
                newLoading[key] = "sub-rows";
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

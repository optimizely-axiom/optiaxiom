import type { Meta, StoryObj } from "@storybook/react";

import {
  Box,
  Button,
  Menu,
  MenuContent,
  MenuItem,
  MenuTrigger,
  Text,
} from "@optiaxiom/react";
import { type ColumnDef, DataTable } from "@optiaxiom/react/unstable";
import { IconArrowDown } from "@tabler/icons-react";

type Payment = {
  amount: number;
  email: string;
  id: string;
  status: string;
};

const meta: Meta<typeof DataTable> = {
  component: DataTable,
};

export default meta;

type Story = StoryObj<typeof DataTable<Payment, string>>;

const data: Payment[] = [
  {
    amount: 316,
    email: "ken99@yahoo.com",
    id: "m5gr84i9",
    status: "success",
  },
  {
    amount: 242,
    email: "abe45@gmail.com",
    id: "3u1reuv4",
    status: "success",
  },
  {
    amount: 837,
    email: "monserrat44@gmail.com",
    id: "derv1ws0",
    status: "processing",
  },
  {
    amount: 874,
    email: "silas22@gmail.com",
    id: "5kma53ae",
    status: "success",
  },
  {
    amount: 721,
    email: "carmella@hotmail.com",
    id: "bhqecj4p",
    status: "failed",
  },
];

const columns: ColumnDef<Payment, string>[] = [
  {
    accessorKey: "id",
    cell: ({ row }) => <Box>{row.getValue("id")}</Box>,
    header: "Id",
  },
  {
    accessorKey: "status",
    cell: ({ row }) => (
      <Box textTransform="capitalize">{row.getValue("status")}</Box>
    ),
    header: "Order Status",
  },
  {
    accessorKey: "status0",
    cell: ({ row }) => (
      <Box textTransform="capitalize">{row.getValue("status")}</Box>
    ),
    header: "Order Status",
  },
  {
    accessorKey: "status1",
    cell: ({ row }) => (
      <Box textTransform="capitalize">{row.getValue("status")}</Box>
    ),
    header: "Order Status",
  },
  {
    accessorKey: "status2",
    cell: ({ row }) => (
      <Box textTransform="capitalize">{row.getValue("status")}</Box>
    ),
    header: "Order Status",
  },
  {
    accessorKey: "status3",
    cell: ({ row }) => (
      <Box textTransform="capitalize">{row.getValue("status")}</Box>
    ),
    header: "Order Status",
  },
  {
    accessorKey: "status4",
    cell: ({ row }) => (
      <Box textTransform="capitalize">{row.getValue("status")}</Box>
    ),
    header: "Order Status",
  },
  {
    accessorKey: "email",
    cell: ({ row }) => <Box>{row.getValue("email")}</Box>,
    header: ({ column }) => {
      return (
        <Box alignItems="center" display="flex" justifyContent="space-between">
          Email
          <Button
            icon={<IconArrowDown />}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            size="sm"
          ></Button>
        </Box>
      );
    },
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
    header: () => <Box textAlign="end">Amount</Box>,
  },
];

export const Basic: Story = {
  args: {
    columns: columns,
    data: data,
    pinnedColumns: ["id"],
  },
};

export const Empty: Story = {
  args: {
    columns: columns,
    data: [],
  },
};

export const ConditionalRendering: Story = {
  args: {
    columns: [
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "amount",
        cell: ({ getValue }) => {
          const amount = getValue() as unknown as number;
          if (typeof amount === "number") {
            return amount > 500 ? (
              <Text as="span" color="green.200">
                ${amount.toFixed(2)}
              </Text>
            ) : (
              <Text as="span" color="red.200">
                ${amount.toFixed(2)}
              </Text>
            );
          }
          return "Invalid amount";
        },
        header: "Amount",
      },
      {
        accessorKey: "status",
        header: "Status",
      },
    ] as ColumnDef<Payment, string>[],
    data: [
      { amount: 600, email: "john@example.com", id: "1", status: "success" },
      { amount: 400, email: "jane@example.com", id: "2", status: "processing" },
      { amount: 800, email: "bob@example.com", id: "3", status: "failed" },
    ],
  },
};

export const WithActions: Story = {
  args: {
    columns: [
      {
        cell: () => (
          <Menu>
            <MenuTrigger>Actions</MenuTrigger>

            <MenuContent>
              <MenuItem>Delete</MenuItem>
              <MenuItem>Archive</MenuItem>
              <MenuItem>Edit</MenuItem>
            </MenuContent>
          </Menu>
        ),
        header: "Actions",
        id: "actions",
      },
      ...columns,
    ],
    data: data,
  },
};

export const LargeDataset: Story = {
  args: {
    columns: columns,
    data: Array.from({ length: 1000 }, (_, i) => ({
      amount: Math.floor(Math.random() * 1000),
      email: `person${i + 1}@example.com`,
      id: (i + 1).toString(),
      status: ["success", "processing", "failed"][
        Math.floor(Math.random() * 3)
      ],
    })),
  },
};

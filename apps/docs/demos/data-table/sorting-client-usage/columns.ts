import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<{
  amount: string;
  firstName: string;
  id: number;
  lastName: string;
}>();

export const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    size: 60,
  }),
  columnHelper.accessor("firstName", {
    enableSorting: true,
    header: "First Name",
  }),
  columnHelper.accessor("lastName", {
    enableSorting: true,
    header: "Last Name",
  }),
  columnHelper.accessor("amount", {
    cell: ({ renderValue }) => `$${renderValue()}`,
    enableSorting: true,
    header: "Amount",
    sortingFn: "alphanumeric",
  }),
];

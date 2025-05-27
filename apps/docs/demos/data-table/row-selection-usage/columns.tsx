import { DataTableCheckbox } from "@optiaxiom/react";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<{
  amount: string;
  firstName: string;
  id: number;
  lastName: string;
}>();

export const columns = [
  columnHelper.display({
    cell: () => <DataTableCheckbox />,
    header: () => <DataTableCheckbox />,
    id: "select",
    size: 48,
  }),
  columnHelper.accessor("id", {
    header: "ID",
    size: 60,
  }),
  columnHelper.accessor("firstName", {
    header: "First Name",
  }),
  columnHelper.accessor("lastName", {
    header: "Last Name",
  }),
  columnHelper.accessor("amount", {
    cell: ({ renderValue }) => `$${renderValue()}`,
    header: "Amount",
  }),
];

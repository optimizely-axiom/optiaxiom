import { Cover, DataTableCheckbox, DataTableLabel } from "@optiaxiom/react";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<{
  amount: string;
  id: number;
  name: string;
}>();

export const columns = [
  columnHelper.display({
    cell: () => (
      <Cover asChild>
        <DataTableCheckbox />
      </Cover>
    ),
    header: () => (
      <Cover asChild>
        <DataTableCheckbox />
      </Cover>
    ),
    id: "select",
    size: 48,
  }),
  columnHelper.accessor("id", {
    header: "ID",
    size: 60,
  }),
  columnHelper.accessor("name", {
    cell: ({ renderValue }) => <DataTableLabel>{renderValue()}</DataTableLabel>,
    header: "Name",
    size: 200,
  }),
  columnHelper.accessor("amount", {
    cell: ({ renderValue }) => `$${renderValue()}`,
    header: "Amount",
  }),
];

import {
  DataTableExpandableCell,
  DataTableExpandableHeader,
} from "@optiaxiom/react/unstable";
import { createColumnHelper } from "@tanstack/react-table";

type Data = {
  amount: null | string;
  id: string;
  items: Array<Data>;
  name: string;
};
const columnHelper = createColumnHelper<Data>();

export const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    size: 60,
  }),
  columnHelper.accessor("name", {
    cell: DataTableExpandableCell,
    header: () => <DataTableExpandableHeader>Name</DataTableExpandableHeader>,
    size: 200,
  }),
  columnHelper.accessor("amount", {
    cell: ({ renderValue, row }) =>
      row.getValue("amount") ? `$${renderValue()}` : null,
    header: "Amount",
  }),
];

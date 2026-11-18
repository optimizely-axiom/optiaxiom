import {
  columnSizingFeature,
  createColumnHelper,
  tableFeatures,
} from "@tanstack/react-table";

export const features = tableFeatures({ columnSizingFeature });

const columnHelper = createColumnHelper<
  typeof features,
  {
    amount: string;
    firstName: string;
    id: number;
    lastName: string;
  }
>();

export const columns = columnHelper.columns([
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
]);

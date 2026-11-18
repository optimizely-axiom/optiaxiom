import {
  DataTableExpandableCell,
  DataTableExpandableHeader,
} from "@optiaxiom/react/unstable";
import {
  columnSizingFeature,
  createColumnHelper,
  createExpandedRowModel,
  rowExpandingFeature,
  tableFeatures,
} from "@tanstack/react-table";

export const features = tableFeatures({
  columnSizingFeature,
  expandedRowModel: createExpandedRowModel(),
  rowExpandingFeature,
});

type Data = {
  amount: null | string;
  id: string;
  items: Array<Data>;
  name: string;
};
const columnHelper = createColumnHelper<typeof features, Data>();

export const columns = columnHelper.columns([
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
]);

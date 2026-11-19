import {
  Button,
  Cover,
  DataTableAction,
  DataTableCheckbox,
  DataTableLabel,
  toaster,
} from "@optiaxiom/react";
import {
  columnSizingFeature,
  createColumnHelper,
  rowSelectionFeature,
  tableFeatures,
} from "@tanstack/react-table";

export const features = tableFeatures({
  columnSizingFeature,
  rowSelectionFeature,
});

const columnHelper = createColumnHelper<
  typeof features,
  {
    amount: string;
    id: number;
    name: string;
  }
>();

export const columns = columnHelper.columns([
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
  columnHelper.accessor("name", {
    cell: ({ renderValue }) => <DataTableLabel>{renderValue()}</DataTableLabel>,
    header: "Name",
    size: 200,
  }),
  columnHelper.display({
    cell: ({ row }) => (
      <DataTableAction primary>
        <Button
          appearance="subtle"
          onClick={() => toaster.create(`Opened: ${row.original.name}`)}
          size="sm"
        >
          Open
        </Button>
      </DataTableAction>
    ),
    header: "Actions",
    id: "actions",
  }),
]);

import {
  Button,
  DataTableAction,
  DataTableLabel,
  rowHighlightingFeature,
  toaster,
} from "@optiaxiom/react";
import { createColumnHelper, tableFeatures } from "@tanstack/react-table";

export const features = tableFeatures({ rowHighlightingFeature });

const columnHelper = createColumnHelper<
  typeof features,
  {
    amount: string;
    id: number;
    name: string;
  }
>();

export const columns = columnHelper.columns([
  columnHelper.accessor("name", {
    cell: ({ renderValue }) => <DataTableLabel>{renderValue()}</DataTableLabel>,
    header: "Name",
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

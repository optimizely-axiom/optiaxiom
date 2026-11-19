import {
  Button,
  DataTableAction,
  DataTableCheckbox,
  DataTableLabel,
  rowIntentFeature,
} from "@optiaxiom/react";
import {
  createColumnHelper,
  rowSelectionFeature,
  tableFeatures,
} from "@tanstack/react-table";

import type { data } from "./data";

export const features = tableFeatures({
  rowIntentFeature,
  rowSelectionFeature,
});

const columnHelper = createColumnHelper<
  typeof features,
  (typeof data)[number]
>();

export const columns = (onOpen: (id: string) => void) =>
  columnHelper.columns([
    columnHelper.display({
      cell: () => <DataTableCheckbox />,
      header: () => <DataTableCheckbox />,
      id: "select",
    }),
    columnHelper.accessor("name", {
      cell: ({ renderValue }) => (
        <DataTableLabel>{renderValue()}</DataTableLabel>
      ),
      header: "Name",
    }),
    columnHelper.display({
      cell: ({ row }) => (
        <DataTableAction primary>
          <Button appearance="subtle" onClick={() => onOpen(row.id)} size="sm">
            Open
          </Button>
        </DataTableAction>
      ),
      header: "Actions",
      id: "actions",
    }),
  ]);

import {
  DataTableAction,
  DataTableLabel,
  EllipsisMenuButton,
  Menu,
  MenuContent,
  MenuTrigger,
  toaster,
} from "@optiaxiom/react";
import { VisuallyHidden } from "@optiaxiom/react/unstable";
import {
  columnFilteringFeature,
  columnResizingFeature,
  columnSizingFeature,
  createColumnHelper,
  createFilteredRowModel,
  createPaginatedRowModel,
  filterFn_equals,
  filterFn_includesString,
  globalFilteringFeature,
  rowPaginationFeature,
  tableFeatures,
} from "@tanstack/react-table";

import type { Item } from "./data";

export const features = tableFeatures({
  columnFilteringFeature,
  columnResizingFeature,
  columnSizingFeature,
  filteredRowModel: createFilteredRowModel(),
  filterFns: {
    equals: filterFn_equals,
    includesString: filterFn_includesString,
  },
  globalFilteringFeature,
  paginatedRowModel: createPaginatedRowModel(),
  rowPaginationFeature,
});

const columnHelper = createColumnHelper<typeof features, Item>();

export const columns = columnHelper.columns([
  columnHelper.accessor("name", {
    cell: ({ renderValue }) => <DataTableLabel>{renderValue()}</DataTableLabel>,
    header: "Name",
  }),
  columnHelper.accessor("status", {
    enableGlobalFilter: false,
    filterFn: "equals",
    header: "Status",
  }),
  columnHelper.accessor("owner", {
    enableGlobalFilter: false,
    filterFn: "equals",
    header: "Owner",
  }),
  columnHelper.display({
    cell: ({ row }) => (
      <Menu
        options={[
          {
            execute: () => toaster.create(`Edit ${row.original.name}`),
            label: "Edit",
          },
          {
            execute: () => toaster.create(`Delete ${row.original.name}`),
            intent: "danger",
            label: "Delete",
          },
        ]}
      >
        <DataTableAction>
          <MenuTrigger asChild>
            <EllipsisMenuButton
              appearance="subtle"
              aria-label={`Actions for ${row.original.name}`}
              size="sm"
            />
          </MenuTrigger>
        </DataTableAction>
        <MenuContent />
      </Menu>
    ),
    enableResizing: false,
    header: () => <VisuallyHidden>Actions</VisuallyHidden>,
    id: "actions",
    size: 64,
  }),
]);

import type { Table } from "@tanstack/table-core";

import { forwardRef, useRef, useState } from "react";

import { type BoxProps } from "../box";
import { Group } from "../group";
import { DataTableProvider } from "./DataTableContext";

export type DataTableProps = BoxProps<
  "div",
  {
    /**
     * Pass the table instance returned from `useReactTable()` hook.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    table: Table<any>;
  }
>;

/**
 * Easy to use table and datagrids built using [TanStack Table](https://tanstack.com/table/latest).
 *
 * Pass `loading` and `empty` to `DataTableBody` to show a loading state while
 * rows load and an empty state when there are no results.
 *
 * Every accessor column is sortable by default, so each header renders a sort
 * button. Pass `enableSorting: false` to `useReactTable()` unless the table
 * sorts its rows (`getSortedRowModel`, or server-side via `onSortingChange`).
 *
 * Column widths come from the column `size` in pixels. Resizable columns (the
 * default) share leftover width in proportion to their `size`; set
 * `enableResizing: false` to keep a column at exactly `size`.
 *
 * @category data-display
 * @group DataTable
 * @since 1.4.0
 */
export const DataTable = forwardRef<HTMLDivElement, DataTableProps>(
  ({ children, table, ...props }, ref) => {
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const focusRequestRef = useRef(false);

    return (
      <Group
        flexDirection="column"
        gap="8"
        maxH="full"
        maxW="full"
        ref={ref}
        {...props}
      >
        <DataTableProvider
          focusRequestRef={focusRequestRef}
          highlightedIndex={highlightedIndex}
          setHighlightedIndex={setHighlightedIndex}
          table={table}
        >
          {children}
        </DataTableProvider>
      </Group>
    );
  },
);

DataTable.displayName = "@optiaxiom/react/DataTable";

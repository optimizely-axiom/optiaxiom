import type { Table } from "@tanstack/table-core";

import { forwardRef, useState } from "react";

import { type BoxProps } from "../box";
import { Flex } from "../flex";
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
 * @category data-display
 * @group DataTable
 * @since 1.4.0
 */
export const DataTable = forwardRef<HTMLDivElement, DataTableProps>(
  ({ children, table, ...props }, ref) => {
    const [highlightedIndex, setHighlightedIndex] = useState(-1);

    return (
      <Flex gap="8" maxH="full" maxW="full" ref={ref} {...props}>
        <DataTableProvider
          highlightedIndex={highlightedIndex}
          setHighlightedIndex={setHighlightedIndex}
          table={table}
        >
          {children}
        </DataTableProvider>
      </Flex>
    );
  },
);

DataTable.displayName = "@optiaxiom/react/DataTable";

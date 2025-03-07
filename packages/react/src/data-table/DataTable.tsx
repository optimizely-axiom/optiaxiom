import type { Table } from "@tanstack/table-core";

import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { DataTableContextProvider } from "../data-table-context";
import { Flex } from "../flex";

type DataTableProps = BoxProps<
  "div",
  {
    /**
     * Pass the table instance returned from `useReactTable()` hook.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    table: Table<any>;
  }
>;

export const DataTable = forwardRef<HTMLDivElement, DataTableProps>(
  ({ children, table, ...props }, ref) => {
    return (
      <Flex
        gap="8"
        justifyContent="flex-start"
        maxH="full"
        maxW="full"
        ref={ref}
        {...props}
      >
        <DataTableContextProvider table={table}>
          {children}
        </DataTableContextProvider>
      </Flex>
    );
  },
);

DataTable.displayName = "@optiaxiom/react/DataTable";

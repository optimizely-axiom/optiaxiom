import { forwardRef, useMemo, useRef, useState } from "react";

import { type BoxProps } from "../box";
import { Group } from "../group";
import { DataTableProvider } from "./DataTableContext";
import { adaptTable, type TanStackTable } from "./tanstack";

export type DataTableProps = BoxProps<
  "div",
  {
    /**
     * Pass the table instance returned from `useReactTable()` hook.
     */
    table: TanStackTable;
  }
>;

/**
 * Easy to use table and datagrids built using [TanStack Table](https://tanstack.com/table/latest).
 *
 * Pass `loading` and `empty` to `DataTableBody` to show a loading state while
 * rows load and an empty state when there are no results.
 *
 * @category data-display
 * @group DataTable
 * @since 1.4.0
 */
export const DataTable = forwardRef<HTMLDivElement, DataTableProps>(
  ({ children, table, ...props }, ref) => {
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const focusRequestRef = useRef(false);
    const adapter = useMemo(() => adaptTable(table), [table]);

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
          table={adapter}
        >
          {children}
        </DataTableProvider>
      </Group>
    );
  },
);

DataTable.displayName = "@optiaxiom/react/DataTable";

import { forwardRef, useCallback, useMemo, useRef, useState } from "react";
import { useSyncExternalStore } from "use-sync-external-store/shim";

import { type BoxProps } from "../box";
import { Group } from "../group";
import { DataTableProvider } from "./DataTableContext";
import { adaptTable, type TanStackTable } from "./tanstack";

export type DataTableProps = BoxProps<
  "div",
  {
    /**
     * Pass the table instance returned from TanStack Table's `useReactTable()`
     * (v8) or `useTable()` (v9) hook.
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
    /**
     * A v9 table re-renders its owner only for the state its `useTable`
     * selector picks, so subscribe to all of it. Keyed on the store: `useTable`
     * returns a new table object on most renders. v8 tables have no store.
     */
    const store = table.store;
    const getTableState = () => store?.get();
    const tableState = useSyncExternalStore(
      useCallback(
        (onChange: () => void) => {
          const subscription = store?.subscribe(onChange);
          return () => subscription?.unsubscribe();
        },
        [store],
      ),
      getTableState,
      getTableState,
    );
    // A new state snapshot hands the components a new adapter, which
    // re-renders them even when the owner's `useTable` selector skipped it.
    const adapter = useMemo(
      () => adaptTable(table, tableState),
      [table, tableState],
    );

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

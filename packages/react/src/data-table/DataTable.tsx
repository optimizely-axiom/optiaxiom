import { forwardRef, useCallback, useMemo, useRef, useState } from "react";
import { useSyncExternalStore } from "use-sync-external-store/shim";

import { type BoxProps } from "../box";
import { Group } from "../group";
import { useEvent } from "../hooks";
import { DataTableProvider } from "./DataTableContext";
import { adaptTable, type TanStackTable } from "./tanstack";

export type DataTableProps = BoxProps<
  "div",
  {
    /**
     * What a row click and the arrow keys do in a table with row selection.
     *
     * - `replace`: a click selects only that row, a double click runs its
     *   primary action, and the arrow keys move focus and selection.
     * - `toggle`: a click runs the row's primary action, or toggles the row
     *   when it has none. Only the checkbox, Space and Shift + arrow keys
     *   change the selection; the arrow keys only move focus. Unlike React
     *   Aria's `toggle`, a click runs the primary action even while rows are
     *   selected.
     *
     * @default "replace"
     */
    selectionBehavior?: "replace" | "toggle";
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
  ({ children, selectionBehavior = "replace", table, ...props }, ref) => {
    const [localHighlightedIndex, setLocalHighlightedIndex] = useState(-1);
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
    /**
     * A v8 table has no store, and `useReactTable` returns the same table on
     * every render. Its `getState()` returns a new object after each update,
     * so it stands in for the snapshot. Without it, `children` created outside
     * the owner never get a new adapter and keep showing stale rows.
     */
    const snapshot = store ? tableState : table.getState?.();
    // A new state snapshot hands the components a new adapter, which
    // re-renders them even when the owner's `useTable` selector skipped it.
    const adapter = useMemo(
      () => adaptTable(table, snapshot),
      [table, snapshot],
    );
    /**
     * The highlighted row lives in table state when the table registers
     * `rowHighlightingFeature`, and here otherwise.
     */
    const highlighting = adapter.getHasRowHighlighting();
    const highlightedIndex = highlighting
      ? adapter.getHighlightedIndex()
      : localHighlightedIndex;
    const setHighlightedIndex = useEvent((index: number) =>
      highlighting
        ? adapter.setHighlightedIndex(index)
        : setLocalHighlightedIndex(index),
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
          selectionBehavior={selectionBehavior}
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

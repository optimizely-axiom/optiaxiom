"use client";

import type { CellContext, Column, Table } from "@tanstack/table-core";

import { createContext } from "@radix-ui/react-context";

export const [DataTableRowProvider, useDataTableRowContext] = createContext<{
  row: ReturnType<typeof fakeRow> | undefined;
  setSelectionMode: ((mode: "single" | false) => void) | undefined;
}>("@optiaxiom/react/DataTableRow", {
  row: undefined,
  setSelectionMode: undefined,
});

const fakeCellsFactory =
  (columns: Column<unknown, unknown>[], rowIndex: number) => () =>
    columns.map((column, columnIndex) => ({
      column,
      getContext: () => ({}) as CellContext<unknown, unknown>,
      id:
        column.id + "-" + ["1/2", "full", "3/4"][(rowIndex + columnIndex) % 3],
    }));

export const fakeRow = (table: Table<unknown>, rowIndex: number) => ({
  getCenterVisibleCells: fakeCellsFactory(
    table.getCenterVisibleLeafColumns(),
    rowIndex,
  ),
  getIsSelected: () => false,
  getLeftVisibleCells: fakeCellsFactory(
    table.getLeftVisibleLeafColumns(),
    rowIndex,
  ),
  getRightVisibleCells: fakeCellsFactory(
    table.getRightVisibleLeafColumns(),
    rowIndex,
  ),
  getToggleSelectedHandler: () => (_event: unknown) => {},
  id: "loading" + rowIndex,
});

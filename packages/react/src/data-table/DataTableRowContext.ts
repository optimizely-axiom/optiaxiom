"use client";

import type { CellContext, Column, Table } from "@tanstack/table-core";
import type { RefObject } from "react";

import { createContext } from "@radix-ui/react-context";

export const [DataTableRowProvider, useDataTableRowContext] = createContext<{
  actions: Array<RefObject<HTMLDivElement>>;
  focusManaged: boolean | undefined;
  highlightedIndex: number;
  labelId: string | undefined;
  onActionMount:
    | ((params: {
        primary: boolean | undefined;
        ref: RefObject<HTMLDivElement>;
      }) => void)
    | undefined;
  row: ReturnType<typeof fakeRow> | undefined;
  setHighlightedIndex: ((highlightedIndex: number) => void) | undefined;
  setSelector:
    | ((ref: RefObject<HTMLInputElement> | undefined) => void)
    | undefined;
}>("@optiaxiom/react/DataTableRow", {
  actions: [],
  focusManaged: undefined,
  highlightedIndex: -1,
  labelId: undefined,
  onActionMount: undefined,
  row: undefined,
  setHighlightedIndex: undefined,
  setSelector: undefined,
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
  getCanMultiSelect: () => false,
  getCanSelect: () => false,
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
  toggleSelected: (_value?: boolean) => {},
});

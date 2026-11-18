"use client";

import { createContext } from "@radix-ui/react-context";
import { createElement, type RefObject } from "react";

import type {
  TableAdapter,
  TanStackCell,
  TanStackColumn,
  TanStackRow,
} from "./tanstack";

import { Skeleton } from "../skeleton";

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
  row: TanStackRow | undefined;
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
  (columns: TanStackColumn[], rowIndex: number) => (): TanStackCell[] =>
    columns.map((column, columnIndex) => ({
      column: {
        ...column,
        columnDef: {
          ...column.columnDef,
          cell: () =>
            createElement(Skeleton, {
              w: (["1/2", "full", "3/4"] as const)[
                (rowIndex + columnIndex) % 3
              ],
            }),
        },
      },
      getContext: () => ({}),
      id: column.id,
    }));

export const fakeRow = (table: TableAdapter, rowIndex: number): TanStackRow => {
  const getCenterVisibleCells = fakeCellsFactory(
    table.getCenterColumns(),
    rowIndex,
  );
  return {
    getAllCells: getCenterVisibleCells,
    getCanMultiSelect: () => false,
    getCanSelect: () => false,
    getCenterVisibleCells,
    getIsSelected: () => false,
    getLeftVisibleCells: fakeCellsFactory(
      table.getPinnedColumns("left"),
      rowIndex,
    ),
    getRightVisibleCells: fakeCellsFactory(
      table.getPinnedColumns("right"),
      rowIndex,
    ),
    getToggleSelectedHandler: () => () => {},
    id: "loading" + rowIndex,
    toggleSelected: () => {},
  };
};

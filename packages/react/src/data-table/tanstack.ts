import { type ComponentType, createElement, type ReactNode } from "react";

export type TanStackCell = {
  column: TanStackColumn;
  getContext(): unknown;
  id: string;
};

export type TanStackColumn = {
  columnDef: { cell?: unknown; header?: unknown; size?: number };
  getCanResize(): boolean;
  getCanSort(): boolean;
  getIsPinned(): Pinned;
  getIsResizing(): boolean;
  getIsSorted(): "asc" | "desc" | false;
  getSize(): number;
  getStart(position?: "center" | Pinned): number;
  id: string;
  resetSize(): void;
  toggleSorting(): void;
};

/**
 * @docs opaque
 */
export type TanStackHeader = {
  colSpan: number;
  column: TanStackColumn;
  getContext(): unknown;
  getResizeHandler(): (event: unknown) => void;
  getSize(): number;
  id: string;
  isPlaceholder: boolean;
};

export type TanStackRow = {
  getAllCells(): TanStackCell[];
  getCanMultiSelect(): boolean;
  getCanSelect(): boolean;
  getCenterVisibleCells(): TanStackCell[];
  getIsSelected(): boolean;
  getLeftVisibleCells(): TanStackCell[];
  getRightVisibleCells(): TanStackCell[];
  getToggleSelectedHandler(): (event: unknown) => void;
  id: string;
  toggleSelected(value?: boolean): void;
};

/**
 * The parts of a TanStack Table instance DataTable reads. DataTable's
 * components reach it only through `adaptTable` below.
 *
 * @docs opaque
 */
export type TanStackTable = {
  getAllLeafColumns(): TanStackColumn[];
  getCenterVisibleLeafColumns(): TanStackColumn[];
  getHeaderGroups(): Array<{ headers: TanStackHeader[]; id: string }>;
  getIsAllPageRowsSelected(): boolean;
  getIsSomePageRowsSelected(): boolean;
  getIsSomeRowsSelected(): boolean;
  getLeftTotalSize(): number;
  getLeftVisibleLeafColumns(): TanStackColumn[];
  getPageCount(): number;
  getRightTotalSize(): number;
  getRightVisibleLeafColumns(): TanStackColumn[];
  getRowCount(): number;
  getRowModel(): { rows: TanStackRow[] };
  getState(): {
    columnSizingInfo: { deltaOffset: null | number };
    pagination: PaginationState;
  };
  getToggleAllPageRowsSelectedHandler(): (event: unknown) => void;
  options: { columnResizeMode?: string; enableRowSelection?: unknown };
  setPageIndex(pageIndex: number): void;
  setPageSize(pageSize: number): void;
  setRowSelection(
    updater:
      | ((old: RowSelectionState) => RowSelectionState)
      | RowSelectionState,
  ): void;
};

type PaginationState = { pageIndex: number; pageSize: number };

type Pinned = "left" | "right" | false;

type RowSelectionState = Record<string, boolean>;

type Side = "left" | "right";

/**
 * Wraps a table in the API DataTable's components read, so they never touch
 * the table itself. Rows, columns, headers and cells stay TanStack's own
 * objects (their identity keys rows and the virtualizer), and the methods that
 * read them take them as arguments.
 */
export const adaptTable = (table: TanStackTable) => ({
  /** Whether the column grows to fill the table's free width. */
  getCanGrow: (column: TanStackColumn) => column.getCanResize(),
  getCanMultiSelect: (row: TanStackRow) => row.getCanMultiSelect(),
  /** Whether the column shows a resize handle. */
  getCanResize: (column: TanStackColumn) => column.getCanResize(),
  getCanRowExpand: (row: { getCanExpand(): boolean }) => row.getCanExpand(),
  getCanSelect: (row: TanStackRow) => row.getCanSelect(),
  /**
   * Whether a click selects rows. A table without selection hands a single
   * click to the row's primary action instead.
   */
  getCanSelectRows: () => table.options.enableRowSelection !== false,
  getCanSort: (column: TanStackColumn) => column.getCanSort(),
  getCenterCells: (row: TanStackRow) => row.getCenterVisibleCells(),
  getCenterColumns: () => table.getCenterVisibleLeafColumns(),
  getColumnSize: (column: TanStackColumn) => column.getSize(),
  /** A pinned column's offset from the edge of its pinned region. */
  getColumnStart: (column: TanStackColumn, side: Side) => column.getStart(side),
  getHeaderGroups: () => table.getHeaderGroups(),
  getHeaderSize: (header: TanStackHeader) => header.getSize(),
  getIsAllPageRowsSelected: () => table.getIsAllPageRowsSelected(),
  getIsResizing: (column: TanStackColumn) => column.getIsResizing(),
  getIsRowExpanded: (row: { getIsExpanded(): boolean }) => row.getIsExpanded(),
  getIsSelected: (row: TanStackRow) => row.getIsSelected(),
  /** Whether some but not all rows on the page are selected. */
  getIsSomePageRowsSelected: () => table.getIsSomePageRowsSelected(),
  getIsSomeRowsSelected: () => table.getIsSomeRowsSelected(),
  getIsSorted: (column: TanStackColumn) => column.getIsSorted(),
  getPageCount: () => table.getPageCount(),
  getPagination: () => table.getState().pagination,
  /** The side a column is pinned to. */
  getPinned: (column: TanStackColumn) => column.getIsPinned(),
  getPinnedCells: (row: TanStackRow, side: Side) =>
    side === "left" ? row.getLeftVisibleCells() : row.getRightVisibleCells(),
  getPinnedColumns: (side: Side) =>
    side === "left"
      ? table.getLeftVisibleLeafColumns()
      : table.getRightVisibleLeafColumns(),
  getPinnedTotalSize: (side: Side) =>
    side === "left" ? table.getLeftTotalSize() : table.getRightTotalSize(),
  /**
   * How far the column edge has been dragged, while a column resizes in
   * `onEnd` mode (TanStack moves the edge only on release).
   */
  getResizeDeltaOffset: () =>
    table.options.columnResizeMode === "onEnd"
      ? table.getState().columnSizingInfo.deltaOffset
      : undefined,
  getResizeHandler: (header: TanStackHeader) => header.getResizeHandler(),
  getRowCount: () => table.getRowCount(),
  getRows: () => table.getRowModel().rows,
  getToggleAllPageRowsSelectedHandler: () =>
    table.getToggleAllPageRowsSelectedHandler(),
  getToggleRowExpandedHandler: (row: {
    getToggleExpandedHandler(): () => void;
  }) => row.getToggleExpandedHandler(),
  getToggleSelectedHandler: (row: TanStackRow) =>
    row.getToggleSelectedHandler(),
  resetSize: (column: TanStackColumn) => column.resetSize(),
  setPageIndex: (pageIndex: number) => table.setPageIndex(pageIndex),
  setPageSize: (pageSize: number) => table.setPageSize(pageSize),
  setRowSelection: (
    updater:
      | ((old: RowSelectionState) => RowSelectionState)
      | RowSelectionState,
  ) => table.setRowSelection(updater),
  toggleSelected: (row: TanStackRow) => row.toggleSelected(),
  toggleSorting: (column: TanStackColumn) => column.toggleSorting(),
});

export type TableAdapter = ReturnType<typeof adaptTable>;

/**
 * Renders a column's `cell` or `header` template the way TanStack's
 * `flexRender` does: components as elements, anything else as is. A copy
 * keeps DataTable from importing TanStack at runtime.
 */
export const render = (template: unknown, context: unknown) =>
  template === null || template === undefined
    ? null
    : typeof template === "function" || isExoticComponent(template)
      ? createElement(template as ComponentType<object>, context as object)
      : (template as ReactNode);

/** A `memo` or `forwardRef` component, which is an object rather than a function. */
const isExoticComponent = (value: unknown) =>
  typeof value === "object" &&
  value !== null &&
  "$$typeof" in value &&
  typeof value.$$typeof === "symbol" &&
  ["react.forward_ref", "react.memo"].includes(
    value.$$typeof.description ?? "",
  );

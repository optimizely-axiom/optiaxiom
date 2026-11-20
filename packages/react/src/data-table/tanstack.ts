import { type ComponentType, createElement, type ReactNode } from "react";

import type { RowIntent } from "./rowIntentFeature";

export type TanStackCell = {
  column: TanStackColumn;
  getContext(): unknown;
  id: string;
};

export type TanStackColumn = {
  columnDef: { cell?: unknown; header?: unknown; size?: number };
  getCanResize?(): boolean;
  getCanSort?(): boolean;
  getIsPinned?(): Pinned;
  getIsResizing?(): boolean;
  getIsSorted?(): "asc" | "desc" | false;
  getSize?(): number;
  getStart?(position?: "center" | Pinned): number;
  id: string;
  resetSize?(): void;
  toggleSorting?(): void;
};

/**
 * @docs opaque
 */
export type TanStackHeader = {
  colSpan: number;
  column: TanStackColumn;
  getContext(): unknown;
  getResizeHandler?(): (event: unknown) => void;
  getSize?(): number;
  id: string;
  isPlaceholder: boolean;
  subHeaders: TanStackHeader[];
};

export type TanStackRow = {
  getAllCells(): TanStackCell[];
  getCanMultiSelect?(): boolean;
  getCanSelect?(): boolean;
  getCenterVisibleCells?(): TanStackCell[];
  getEndVisibleCells?(): TanStackCell[];
  getIntent?(): RowIntent | undefined;
  getIsSelected?(): boolean;
  getLeftVisibleCells?(): TanStackCell[];
  getRightVisibleCells?(): TanStackCell[];
  getStartVisibleCells?(): TanStackCell[];
  getToggleSelectedHandler?(): (event: unknown) => void;
  getVisibleCells?(): TanStackCell[];
  id: string;
  toggleSelected?(value?: boolean): void;
};

/**
 * The parts of a TanStack Table instance DataTable reads, typed so a table
 * from v8 or v9 fits.
 *
 * v9 only attaches a feature's methods when the table registers that feature,
 * so every feature method is optional and read through `adaptTable` below,
 * which also covers the v8 and v9 names for the same method.
 *
 * v9 keeps row, column, header and cell methods on shared prototypes: call
 * them on the object, never as a detached reference.
 *
 * @docs opaque
 */
export type TanStackTable = {
  getAllLeafColumns(): TanStackColumn[];
  getCenterVisibleLeafColumns?(): TanStackColumn[];
  getEndTotalSize?(): number;
  getEndVisibleLeafColumns?(): TanStackColumn[];
  getHeaderGroups(): Array<{ headers: TanStackHeader[]; id: string }>;
  getIsAllPageRowsSelected?(): boolean;
  getIsSomePageRowsSelected?(): boolean;
  getIsSomeRowsSelected?(): boolean;
  getLeftTotalSize?(): number;
  getLeftVisibleLeafColumns?(): TanStackColumn[];
  getPageCount?(): number;
  getRightTotalSize?(): number;
  getRightVisibleLeafColumns?(): TanStackColumn[];
  getRowCount?(): number;
  getRowModel(): { rows: TanStackRow[] };
  getStartTotalSize?(): number;
  getStartVisibleLeafColumns?(): TanStackColumn[];
  getState?(): {
    columnSizingInfo?: { deltaOffset: null | number };
    pagination?: PaginationState;
  };
  getToggleAllPageRowsSelectedHandler?(): (event: unknown) => void;
  getVisibleLeafColumns?(): TanStackColumn[];
  options: {
    columnResizeMode?: string;
    // Always set; also keeps a table that sets neither option above assignable.
    data: unknown;
    enableRowSelection?: unknown;
  };
  setHighlightedRowId?(highlightedRowId: null | string): void;
  setPageIndex?(pageIndex: number): void;
  setPageSize?(pageSize: number): void;
  setRowSelection?(updater: RowSelectionState | RowSelectionUpdater): void;
  store?: {
    get(): unknown;
    subscribe(listener: () => void): { unsubscribe(): void };
  };
};

type PaginationState = { pageIndex: number; pageSize: number };

/** v8 pins columns `left`/`right`; v9 pins them `start`/`end`. */
type Pinned = "end" | "left" | "right" | "start" | false;

/** v9's shape: unselected rows are left out. */
type RowSelectionState = Record<string, true>;

/**
 * Takes v8's wider selection, which can list unselected rows as `false`, and
 * returns v9's, so an updater fits both versions.
 */
type RowSelectionUpdater = (old: Record<string, boolean>) => RowSelectionState;

/** TanStack's default column size. */
const DEFAULT_SIZE = 150;

type Side = "left" | "right";

/**
 * Wraps a v8 or v9 table in the API DataTable's components read, so they never
 * touch the table itself. Rows, columns, headers and cells stay TanStack's own
 * objects (their identity keys rows and the virtualizer), and the methods that
 * read them take them as arguments.
 *
 * Without a v9 feature, each method returns what the table shows without it,
 * as v9 does internally: no pinning means no pinned columns, no sizing means
 * default sizes, no pagination means one page.
 */
export const adaptTable = (
  table: TanStackTable,
  /**
   * The v9 store's current snapshot, which DataTable subscribes to. Read from
   * it, a state change hands the components a new adapter.
   */
  snapshot = table.store?.get(),
) => {
  // v9's state, as `getState()` is v8's. Unknown in the type: a table without
  // these features has neither slice, and wouldn't fit a type that lists them.
  const state = snapshot as
    | undefined
    | {
        columnResizing?: { deltaOffset: null | number };
        highlightedRowId?: null | string;
        pagination?: PaginationState;
      };
  const getColumnSize = (column: TanStackColumn) =>
    column.getSize?.() ?? column.columnDef.size ?? DEFAULT_SIZE;
  const sumSizes = (columns: TanStackColumn[]) =>
    columns.reduce((size, column) => size + getColumnSize(column), 0);
  const getHeaderSize = (header: TanStackHeader): number =>
    header.getSize?.() ??
    (header.subHeaders.length
      ? header.subHeaders.reduce((size, sub) => size + getHeaderSize(sub), 0)
      : getColumnSize(header.column));
  const getPinnedColumns = (side: Side) =>
    (side === "left"
      ? (table.getStartVisibleLeafColumns?.() ??
        table.getLeftVisibleLeafColumns?.())
      : (table.getEndVisibleLeafColumns?.() ??
        table.getRightVisibleLeafColumns?.())) ?? [];
  const getIsAllPageRowsSelected = () => !!table.getIsAllPageRowsSelected?.();

  return {
    /**
     * Whether the column grows to fill the table's free width. Without the
     * resizing feature every column does, as v8's columns are resizable by
     * default.
     */
    getCanGrow: (column: TanStackColumn) => column.getCanResize?.() ?? true,
    getCanMultiSelect: (row: TanStackRow) => !!row.getCanMultiSelect?.(),
    /** Whether the column shows a resize handle. */
    getCanResize: (column: TanStackColumn) => column.getCanResize?.() ?? false,
    getCanRowExpand: (row: { getCanExpand?(): boolean }) =>
      !!row.getCanExpand?.(),
    getCanSelect: (row: TanStackRow) => !!row.getCanSelect?.(),
    /**
     * Whether a click selects rows. A table without selection hands a single
     * click to the row's primary action instead.
     */
    getCanSelectRows: () =>
      !!table.setRowSelection && table.options.enableRowSelection !== false,
    getCanSort: (column: TanStackColumn) => !!column.getCanSort?.(),
    getCenterCells: (row: TanStackRow) =>
      row.getCenterVisibleCells?.() ??
      row.getVisibleCells?.() ??
      row.getAllCells(),
    getCenterColumns: () =>
      table.getCenterVisibleLeafColumns?.() ??
      table.getVisibleLeafColumns?.() ??
      table.getAllLeafColumns(),
    getColumnSize,
    /** A pinned column's offset from the edge of its pinned region. */
    getColumnStart: (column: TanStackColumn, side: Side) => {
      const start = column.getStart?.(
        table.getStartVisibleLeafColumns
          ? side === "left"
            ? "start"
            : "end"
          : side,
      );
      if (start !== undefined) {
        return start;
      }
      const columns = getPinnedColumns(side);
      const index = columns.findIndex(({ id }) => id === column.id);
      return index > 0 ? sumSizes(columns.slice(0, index)) : 0;
    },
    /**
     * Whether the table keeps the highlighted row in its state: a v9 table
     * that registers `rowHighlightingFeature`.
     */
    getHasRowHighlighting: () => !!table.setHighlightedRowId,
    getHeaderGroups: () => table.getHeaderGroups(),
    getHeaderSize,
    /** The highlighted row's index on the page, or -1 when it isn't on it. */
    getHighlightedIndex: () => {
      const id = state?.highlightedRowId;
      return id === null || id === undefined
        ? -1
        : table.getRowModel().rows.findIndex((row) => row.id === id);
    },
    /** The highlighted row's id from `rowHighlightingFeature`, or `null`. */
    getHighlightedRowId: () => state?.highlightedRowId ?? null,
    /** The row's intent from `rowIntentFeature`. */
    getIntent: (row: TanStackRow) => row.getIntent?.(),
    getIsAllPageRowsSelected,
    getIsResizing: (column: TanStackColumn) => !!column.getIsResizing?.(),
    getIsRowExpanded: (row: { getIsExpanded?(): boolean }) =>
      !!row.getIsExpanded?.(),
    getIsSelected: (row: TanStackRow) => !!row.getIsSelected?.(),
    /**
     * Whether some but not all rows on the page are selected. v9's
     * `getIsSomePageRowsSelected` means at least one, including all.
     */
    getIsSomePageRowsSelected: () =>
      !!table.getIsSomePageRowsSelected?.() && !getIsAllPageRowsSelected(),
    getIsSomeRowsSelected: () => !!table.getIsSomeRowsSelected?.(),
    getIsSorted: (column: TanStackColumn) => column.getIsSorted?.() ?? false,
    getPageCount: () => table.getPageCount?.() ?? 1,
    getPagination: (): PaginationState =>
      state?.pagination ??
      table.getState?.().pagination ?? {
        pageIndex: 0,
        pageSize: table.getRowModel().rows.length,
      },
    /** The side a column is pinned to, in v8's physical names. */
    getPinned: (column: TanStackColumn) => {
      const pinned = column.getIsPinned?.() ?? false;
      return pinned === "start" ? "left" : pinned === "end" ? "right" : pinned;
    },
    getPinnedCells: (row: TanStackRow, side: Side) =>
      (side === "left"
        ? (row.getStartVisibleCells?.() ?? row.getLeftVisibleCells?.())
        : (row.getEndVisibleCells?.() ?? row.getRightVisibleCells?.())) ?? [],
    getPinnedColumns,
    getPinnedTotalSize: (side: Side) =>
      (side === "left"
        ? (table.getStartTotalSize?.() ?? table.getLeftTotalSize?.())
        : (table.getEndTotalSize?.() ?? table.getRightTotalSize?.())) ??
      sumSizes(getPinnedColumns(side)),
    /**
     * How far the column edge has been dragged, while a column resizes in
     * `onEnd` mode (TanStack moves the edge only on release). Unset means
     * `onEnd`: v9's `useTable` returns the options as passed, without the
     * defaults v8 merges in.
     */
    getResizeDeltaOffset: () =>
      (table.options.columnResizeMode ?? "onEnd") === "onEnd"
        ? (state?.columnResizing?.deltaOffset ??
          table.getState?.().columnSizingInfo?.deltaOffset)
        : undefined,
    getResizeHandler: (header: TanStackHeader) => header.getResizeHandler?.(),
    getRowCount: () => table.getRowCount?.() ?? table.getRowModel().rows.length,
    getRows: () => table.getRowModel().rows,
    getToggleAllPageRowsSelectedHandler: () =>
      table.getToggleAllPageRowsSelectedHandler?.(),
    getToggleRowExpandedHandler: (row: {
      getToggleExpandedHandler?(): () => void;
    }) => row.getToggleExpandedHandler?.(),
    getToggleSelectedHandler: (row: TanStackRow) =>
      row.getToggleSelectedHandler?.(),
    resetSize: (column: TanStackColumn) => column.resetSize?.(),
    /** Skips an unchanged row, so refocusing a row doesn't report a change. */
    setHighlightedIndex: (index: number) => {
      const id = table.getRowModel().rows[index]?.id ?? null;
      if (id !== (state?.highlightedRowId ?? null)) {
        table.setHighlightedRowId?.(id);
      }
    },
    setPageIndex: (pageIndex: number) => table.setPageIndex?.(pageIndex),
    setPageSize: (pageSize: number) => table.setPageSize?.(pageSize),
    /**
     * Updaters get and return v9's shape, which lists only selected rows; v8
     * can also list unselected rows as `false`.
     */
    setRowSelection: (
      updater:
        | ((old: RowSelectionState) => RowSelectionState)
        | RowSelectionState,
    ) =>
      table.setRowSelection?.(
        typeof updater === "function"
          ? (old) => updater(toRowSelection(old))
          : updater,
      ),
    toggleSelected: (row: TanStackRow) => row.toggleSelected?.(),
    toggleSorting: (column: TanStackColumn) => column.toggleSorting?.(),
  };
};

export type TableAdapter = ReturnType<typeof adaptTable>;

const toRowSelection = (selection: Record<string, boolean>) => {
  const result: RowSelectionState = {};
  for (const [id, selected] of Object.entries(selection)) {
    if (selected) {
      result[id] = true;
    }
  }
  return result;
};

/**
 * Renders a column's `cell` or `header` template the way TanStack's
 * `flexRender` does: components as elements, anything else as is. A copy
 * keeps DataTable from importing either version at runtime.
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

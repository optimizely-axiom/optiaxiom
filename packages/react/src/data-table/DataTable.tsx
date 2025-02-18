import {
  type CellContext,
  type Column,
  flexRender,
  type Table as ReactTable,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { forwardRef, useRef } from "react";

import type { Sprinkles } from "../sprinkles";

import { Box, type BoxProps } from "../box";
import { DataTableHeaderCell } from "../data-table-header-cell";
import { Pagination } from "../pagination";
import { Skeleton } from "../skeleton";
import { Table } from "../table";
import { TableBody } from "../table-body";
import { TableCell } from "../table-cell";
import { TableHeader } from "../table-header";
import { TableRow } from "../table-row";
import * as styles from "./DataTable.css";

type DataTableProps = BoxProps<
  "div",
  {
    /**
     * The estimated height of rows in pixels when virtualization is enabled.
     */
    estimatedRowHeight?: number;
    /**
     * Indicates if the table is loading
     */
    loading?: boolean;
    /**
     * Pass the table instance returned from `useReactTable()` hook.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    table: ReactTable<any>;
  }
>;

const COL_VIRTUALIZATION_THRESHOLD = 20;
const ROW_VIRTUALIZATION_THRESHOLD = 20;

export const DataTable = forwardRef<HTMLDivElement, DataTableProps>(
  ({ estimatedRowHeight = 52, loading, table, ...props }, ref) => {
    const tableRef = useRef<HTMLDivElement>(null);

    const { rows } = table.getRowModel();
    const centerColumns = table.getCenterVisibleLeafColumns();

    const columnVirtualizer = useVirtualizer({
      count: centerColumns.length,
      enabled: centerColumns.length > COL_VIRTUALIZATION_THRESHOLD,
      estimateSize: (index) => centerColumns[index].getSize(),
      getScrollElement: () => tableRef.current,
      horizontal: true,
    });
    const virtualColumns = columnVirtualizer.getVirtualItems();
    const virtualColumnsOffset = virtualColumns[0]?.start ?? 0;

    const rowVirtualizer = useVirtualizer({
      count: rows.length,
      enabled:
        centerColumns.length > COL_VIRTUALIZATION_THRESHOLD ||
        rows.length > ROW_VIRTUALIZATION_THRESHOLD,
      estimateSize: () => estimatedRowHeight,
      getScrollElement: () => tableRef.current,
    });

    return (
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        maxW="full"
        ref={ref}
        {...props}
      >
        <Table
          layout="fixed"
          ref={tableRef}
          style={assignInlineVars({
            [styles.leftTotalSizeVar]: `${table.getLeftTotalSize()}px`,
            [styles.rightTotalSizeVar]: `${table.getRightTotalSize()}px`,
          })}
          {...styles.table({
            pinned:
              table.getLeftTotalSize() > 0 && table.getRightTotalSize() > 0
                ? "both"
                : table.getLeftTotalSize() > 0
                  ? "left"
                  : table.getRightTotalSize() > 0
                    ? "right"
                    : "none",
          })}
        >
          <TableHeader {...styles.header()}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow display="flex" key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <DataTableHeaderCell
                    header={header}
                    key={header.id}
                    style={{
                      ...assignInlineVars({
                        [styles.cellOffsetVar]: `${header.column.getStart(header.column.getIsPinned() || "left")}px`,
                        [styles.cellSizeVar]: `${header.getSize()}px`,
                      }),
                    }}
                    {...styles.cell({
                      pinned: header.column.getIsPinned() || undefined,
                      pinnedType: header.column.getIsPinned()
                        ? "header"
                        : undefined,
                    })}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </DataTableHeaderCell>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody
            display="grid"
            style={
              rowVirtualizer.options.enabled
                ? { height: `${rowVirtualizer.getTotalSize()}px` }
                : undefined
            }
          >
            {(loading
              ? Array.from({ length: 10 }, (_, rowIndex) => ({
                  row: fakeRow(table, rowIndex),
                  virtualRow: undefined,
                }))
              : rowVirtualizer.options.enabled
                ? rowVirtualizer.getVirtualItems().map((virtualRow) => ({
                    row: rows[virtualRow.index],
                    virtualRow,
                  }))
                : rows.map((row) => ({ row, virtualRow: undefined }))
            ).map(({ row, virtualRow }) => (
              <TableRow
                data-index={virtualRow?.index}
                display="flex"
                key={row.id}
                ref={virtualRow ? rowVirtualizer.measureElement : undefined}
                style={
                  virtualRow
                    ? {
                        minHeight: virtualRow.size,
                        position: "absolute",
                        transform: `translateY(${virtualRow.start}px)`,
                      }
                    : undefined
                }
              >
                {row.getLeftVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    style={{
                      ...assignInlineVars({
                        [styles.cellOffsetVar]: `${cell.column.getStart("left")}px`,
                        [styles.cellSizeVar]: `${cell.column.getSize()}px`,
                      }),
                    }}
                    {...styles.cell({
                      pinned: "left",
                      pinnedType: "body",
                    })}
                  >
                    {loading ? (
                      <Skeleton w={fakeCellWidth(cell.id)} />
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </TableCell>
                ))}

                {columnVirtualizer.options.enabled &&
                  virtualColumnsOffset > 0 && (
                    <TableCell style={{ width: virtualColumnsOffset }} />
                  )}

                {(columnVirtualizer.options.enabled
                  ? virtualColumns.map((virtualCell) => {
                      const cells = row.getCenterVisibleCells();
                      return cells[virtualCell.index];
                    })
                  : row.getCenterVisibleCells()
                ).map((cell) => (
                  <TableCell
                    key={cell.id}
                    style={{
                      ...assignInlineVars({
                        [styles.cellSizeVar]: `${cell.column.getSize()}px`,
                      }),
                    }}
                    {...styles.cell()}
                  >
                    {loading ? (
                      <Skeleton w={fakeCellWidth(cell.id)} />
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </TableCell>
                ))}

                {row.getRightVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    style={{
                      ...assignInlineVars({
                        [styles.cellOffsetVar]: `${cell.column.getStart("right")}px`,
                        [styles.cellSizeVar]: `${cell.column.getSize()}px`,
                      }),
                    }}
                    {...styles.cell({
                      pinned: "right",
                      pinnedType: "body",
                    })}
                  >
                    {loading ? (
                      <Skeleton w={fakeCellWidth(cell.id)} />
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {table.getPageCount() > 1 && (
          <Box mt="8">
            <Pagination
              onPageChange={(newPage) => table.setPageIndex(newPage - 1)}
              page={table.getState().pagination.pageIndex + 1}
              total={table.getPageCount()}
            />
          </Box>
        )}
      </Box>
    );
  },
);

DataTable.displayName = "@optiaxiom/react/DataTable";

const fakeCellsFactory =
  (columns: Column<unknown, unknown>[], rowIndex: number) => () =>
    columns.map((column, columnIndex) => ({
      column,
      getContext: () => ({}) as CellContext<unknown, unknown>,
      id:
        column.id + "-" + ["1/2", "full", "3/4"][(rowIndex + columnIndex) % 3],
    }));

const fakeCellWidth = (id: string) => id.split("-")[1] as Sprinkles["w"];

const fakeRow = (table: ReactTable<unknown>, rowIndex: number) => ({
  getCenterVisibleCells: fakeCellsFactory(
    table.getCenterVisibleLeafColumns(),
    rowIndex,
  ),
  getLeftVisibleCells: fakeCellsFactory(
    table.getLeftVisibleLeafColumns(),
    rowIndex,
  ),
  getRightVisibleCells: fakeCellsFactory(
    table.getRightVisibleLeafColumns(),
    rowIndex,
  ),
  id: "loading" + rowIndex,
});

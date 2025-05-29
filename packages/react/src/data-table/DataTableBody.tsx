import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { flexRender } from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { forwardRef, useRef } from "react";

import type { Sprinkles } from "../sprinkles";

import { type BoxProps } from "../box";
import { Skeleton } from "../skeleton";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../table";
import * as styles from "./DataTableBody.css";
import { useDataTableContext } from "./DataTableContext";
import { DataTableHeaderCell } from "./DataTableHeaderCell";
import { DataTableRow } from "./DataTableRow";
import { fakeRow } from "./DataTableRowContext";

export type DataTableBodyProps = BoxProps<
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
  }
>;

const COL_VIRTUALIZATION_THRESHOLD = 20;
const ROW_VIRTUALIZATION_THRESHOLD = 20;

export const DataTableBody = forwardRef<HTMLDivElement, DataTableBodyProps>(
  ({ className, estimatedRowHeight = 52, loading, ...props }, outerRef) => {
    const innerRef = useRef<HTMLDivElement>(null);
    const ref = useComposedRefs(innerRef, outerRef);

    const { table } = useDataTableContext("@optiaxiom/react/DataTableBody");

    const { rows } = table.getRowModel();
    const centerColumns = table.getCenterVisibleLeafColumns();

    const columnVirtualizer = useVirtualizer({
      count: centerColumns.length,
      enabled: centerColumns.length > COL_VIRTUALIZATION_THRESHOLD,
      estimateSize: (index) => centerColumns[index].getSize(),
      getScrollElement: () => innerRef.current,
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
      getScrollElement: () => innerRef.current,
    });

    return (
      <Table
        layout="fixed"
        ref={ref}
        style={assignInlineVars({
          [styles.leftTotalSizeVar]: `${table.getLeftTotalSize()}px`,
          [styles.rightTotalSizeVar]: `${table.getRightTotalSize()}px`,
          [styles.totalSizeVar]: `${table.getTotalSize()}`,
        })}
        {...styles.table(
          {
            pinned:
              table.getLeftTotalSize() > 0 && table.getRightTotalSize() > 0
                ? "both"
                : table.getLeftTotalSize() > 0
                  ? "left"
                  : table.getRightTotalSize() > 0
                    ? "right"
                    : "none",
          },
          className,
        )}
        {...props}
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
                      [styles.cellSizeVar]: `${header.getSize()}`,
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
          ).map(({ row, virtualRow }, index) => (
            <DataTableRow
              data-index={virtualRow?.index}
              display="flex"
              index={virtualRow?.index ?? index}
              key={row.id}
              ref={virtualRow ? rowVirtualizer.measureElement : undefined}
              row={row}
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
                      [styles.cellSizeVar]: `${cell.column.getSize()}`,
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
                      [styles.cellSizeVar]: `${cell.column.getSize()}`,
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
                      [styles.cellSizeVar]: `${cell.column.getSize()}`,
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
            </DataTableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
);

DataTableBody.displayName = "@optiaxiom/react/DataTableBody";

const fakeCellWidth = (id: string) => id.split("-")[1] as Sprinkles["w"];

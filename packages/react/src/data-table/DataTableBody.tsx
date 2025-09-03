import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { flexRender } from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { forwardRef, useRef } from "react";

import { type BoxProps } from "../box";
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
  ({ estimatedRowHeight = 52, loading, ...props }, outerRef) => {
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
        {...props}
      >
        <TableHeader display="grid" pinned>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow display="flex" key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <DataTableHeaderCell
                  header={header}
                  key={header.id}
                  pinned={!!header.column.getIsPinned()}
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
                  pinned
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
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}

              {row.getRightVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  pinned
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
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
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

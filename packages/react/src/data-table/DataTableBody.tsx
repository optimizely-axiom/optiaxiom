import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { flexRender } from "@tanstack/react-table";
import {
  defaultRangeExtractor,
  type Range,
  useVirtualizer,
} from "@tanstack/react-virtual";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { forwardRef, useCallback, useEffect, useMemo, useRef } from "react";

import { Box, type BoxProps } from "../box";
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
     * Whether to show skeleton for the whole table or specific rows.
     */
    loading?: boolean | Record<string, "sub-rows" | false>;
  }
>;

const COL_VIRTUALIZATION_THRESHOLD = 20;
const ROW_VIRTUALIZATION_THRESHOLD = 20;
const SKELETON_ROW_COUNT = 10;

/**
 * @group DataTable
 */
export const DataTableBody = forwardRef<HTMLDivElement, DataTableBodyProps>(
  (
    { className, estimatedRowHeight = 52, loading, style, ...props },
    outerRef,
  ) => {
    const innerRef = useRef<HTMLDivElement>(null);
    const ref = useComposedRefs(innerRef, outerRef);

    const { highlightedIndex, table } = useDataTableContext(
      "@optiaxiom/react/DataTableBody",
    );

    const { rows: rawRows } = table.getRowModel();
    const rows = useMemo(() => {
      let index = 0;
      return rawRows.reduce<
        Array<(typeof rawRows)[number] | ReturnType<typeof fakeRow>>
      >((result, row) => {
        result.push(row);
        index++;
        if (
          loading &&
          typeof loading === "object" &&
          loading[row.id] === "sub-rows"
        ) {
          result.push(fakeRow(table, index++), fakeRow(table, index++));
        }
        return result;
      }, []);
    }, [loading, rawRows, table]);
    const previousRowsRef = useRef(rows);
    useEffect(() => {
      previousRowsRef.current = rows;
    });

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const calculateScrollTimeline = () => {
      if (!innerRef.current || !scrollContainerRef.current) {
        return;
      }

      const { offsetWidth, scrollLeft, scrollWidth } =
        scrollContainerRef.current;

      if (scrollWidth > offsetWidth) {
        innerRef.current.dataset.scrollTimeline =
          scrollLeft === 0
            ? "left"
            : scrollLeft >= scrollWidth - offsetWidth
              ? "right"
              : "middle";
      } else {
        delete innerRef.current.dataset.scrollTimeline;
      }
    };
    useEffect(() => {
      calculateScrollTimeline();

      const node = scrollContainerRef.current;
      if (!node) return;

      const observer = new ResizeObserver(calculateScrollTimeline);
      observer.observe(node);
      return () => observer.disconnect();
    }, []);
    const centerColumns = table.getCenterVisibleLeafColumns();

    const columnVirtualizer = useVirtualizer({
      count: centerColumns.length,
      enabled: centerColumns.length > COL_VIRTUALIZATION_THRESHOLD,
      estimateSize: (index) => centerColumns[index].getSize(),
      getItemKey: (index) => centerColumns[index].id,
      getScrollElement: () => scrollContainerRef.current,
      horizontal: true,
    });
    const virtualColumns = columnVirtualizer.getVirtualItems();
    const virtualColumnsOffset = virtualColumns[0]?.start ?? 0;

    /**
     * Keep the highlighted row mounted while it is scrolled out of view so
     * keyboard focus isn't dropped to the document body.
     */
    const rangeExtractor = useCallback(
      (range: Range) => {
        const indexes = defaultRangeExtractor(range);
        return highlightedIndex >= 0 &&
          highlightedIndex < range.count &&
          !indexes.includes(highlightedIndex)
          ? [...indexes, highlightedIndex].sort((a, b) => a - b)
          : indexes;
      },
      [highlightedIndex],
    );
    const rowVirtualizer = useVirtualizer({
      count: rows.length,
      enabled:
        centerColumns.length > COL_VIRTUALIZATION_THRESHOLD ||
        rows.length > ROW_VIRTUALIZATION_THRESHOLD,
      estimateSize: () => estimatedRowHeight,
      getItemKey: (index) => rows[index].id,
      getScrollElement: () => scrollContainerRef.current,
      rangeExtractor,
    });
    const virtualRows = rowVirtualizer.getVirtualItems();

    /**
     * Virtualized rows and columns are missing from the DOM, so assistive
     * technology relies on these counts and indexes for the real table size.
     */
    const headerGroups = table.getHeaderGroups();
    const columnIndexes = new Map(
      [
        ...table.getLeftVisibleLeafColumns(),
        ...centerColumns,
        ...table.getRightVisibleLeafColumns(),
      ].map((column, index) => [column.id, index + 1]),
    );

    return (
      <Box
        ref={ref}
        style={{
          ...assignInlineVars({
            [styles.leftTotalSizeVar]: `${table.getLeftTotalSize()}px`,
            [styles.rightTotalSizeVar]: `${table.getRightTotalSize()}px`,
            [styles.totalSizeVar]: (
              headerGroups[0]?.headers.reduce(
                (sum, header) =>
                  sum + (header.column.getCanResize() ? header.getSize() : 0),
                0,
              ) ?? 0
            ).toString(),
          }),
          ...style,
        }}
        {...styles.root({}, className)}
        {...props}
      >
        <Table
          aria-colcount={columnIndexes.size}
          aria-rowcount={
            headerGroups.length +
            (loading === true ? SKELETON_ROW_COUNT : rows.length)
          }
          layout="fixed"
          onScroll={calculateScrollTimeline}
          ref={scrollContainerRef}
        >
          <TableHeader display="grid" pinned>
            {headerGroups.map((headerGroup, headerIndex) => (
              <TableRow
                aria-rowindex={headerIndex + 1}
                display="flex"
                key={headerGroup.id}
              >
                {headerGroup.headers.map((header) => (
                  <DataTableHeaderCell
                    aria-colindex={columnIndexes.get(header.column.id)}
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
                      resizable: header.column.getCanResize(),
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
            {(loading === true
              ? Array.from({ length: SKELETON_ROW_COUNT }, (_, rowIndex) => ({
                  row: fakeRow(table, rowIndex),
                  virtualRow: undefined,
                }))
              : rowVirtualizer.options.enabled
                ? virtualRows.length === 0 && rows.length > 0
                  ? /**
                     * If virtualization was just enabled in this render then
                     * virtualRows will be empty so we render the rows from the
                     * previous render instead temporarily.
                     */
                    previousRowsRef.current.map((row) => ({
                      row,
                      virtualRow: undefined,
                    }))
                  : virtualRows.map((virtualRow) => ({
                      row: rows[virtualRow.index],
                      virtualRow,
                    }))
                : rows.map((row) => ({ row, virtualRow: undefined }))
            ).map(({ row, virtualRow }, index) => (
              <DataTableRow
                aria-rowindex={
                  headerGroups.length + (virtualRow?.index ?? index) + 1
                }
                data-index={virtualRow?.index}
                display="flex"
                index={virtualRow?.index ?? index}
                key={row.id}
                ref={virtualRow ? rowVirtualizer.measureElement : undefined}
                row={row}
                style={
                  virtualRow
                    ? {
                        position: "absolute",
                        transform: `translateY(${virtualRow.start}px)`,
                      }
                    : undefined
                }
              >
                {row.getLeftVisibleCells().map((cell) => (
                  <TableCell
                    aria-colindex={columnIndexes.get(cell.column.id)}
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
                      resizable: cell.column.getCanResize(),
                    })}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}

                {columnVirtualizer.options.enabled &&
                  virtualColumnsOffset > 0 && (
                    <TableCell
                      aria-hidden
                      style={{ width: virtualColumnsOffset }}
                    />
                  )}

                {(columnVirtualizer.options.enabled
                  ? virtualColumns.map((virtualCell) => {
                      const cells = row.getCenterVisibleCells();
                      return cells[virtualCell.index];
                    })
                  : row.getCenterVisibleCells()
                ).map((cell) => (
                  <TableCell
                    aria-colindex={columnIndexes.get(cell.column.id)}
                    key={cell.id}
                    style={{
                      ...assignInlineVars({
                        [styles.cellSizeVar]: `${cell.column.getSize()}`,
                      }),
                    }}
                    {...styles.cell({
                      resizable: cell.column.getCanResize(),
                    })}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}

                {row.getRightVisibleCells().map((cell) => (
                  <TableCell
                    aria-colindex={columnIndexes.get(cell.column.id)}
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
                      resizable: cell.column.getCanResize(),
                    })}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </DataTableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    );
  },
);

DataTableBody.displayName = "@optiaxiom/react/DataTableBody";

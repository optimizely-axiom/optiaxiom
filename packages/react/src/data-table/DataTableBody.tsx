import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { useLayoutEffect } from "@radix-ui/react-use-layout-effect";
import {
  defaultRangeExtractor,
  type Range,
  useVirtualizer,
} from "@tanstack/react-virtual";
import { assignInlineVars, setElementVars } from "@vanilla-extract/dynamic";
import {
  forwardRef,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";

import { Box, type BoxProps } from "../box";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../table";
import * as styles from "./DataTableBody.css";
import { useDataTableContext } from "./DataTableContext";
import { DataTableHeaderCell } from "./DataTableHeaderCell";
import { DataTableRow } from "./DataTableRow";
import { fakeRow } from "./DataTableRowContext";
import {
  render,
  type TableAdapter,
  type TanStackColumn,
  type TanStackRow,
} from "./tanstack";

export type DataTableBodyProps = BoxProps<
  "div",
  {
    /**
     * Content to show in a full-width row when the table has no rows and isn't
     * loading.
     */
    empty?: ReactNode;
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
    { className, empty, estimatedRowHeight = 52, loading, style, ...props },
    outerRef,
  ) => {
    const innerRef = useRef<HTMLDivElement>(null);
    const ref = useComposedRefs(innerRef, outerRef);

    const { highlightedIndex, table } = useDataTableContext(
      "@optiaxiom/react/DataTableBody",
    );

    const rawRows = table.getRows();
    const rows = useMemo(() => {
      let index = 0;
      return rawRows.reduce<TanStackRow[]>((result, row) => {
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
    useLayoutEffect(() => {
      const onResize = () => {
        if (innerRef.current && scrollContainerRef.current) {
          setElementVars(innerRef.current, {
            [styles.visibleWidthVar]: `${scrollContainerRef.current.clientWidth}px`,
          });
        }
        calculateScrollTimeline();
      };
      onResize();

      const node = scrollContainerRef.current;
      if (!node || typeof ResizeObserver === "undefined") return;

      const observer = new ResizeObserver(onResize);
      observer.observe(node);
      return () => observer.disconnect();
    }, []);
    const centerColumns = table.getCenterColumns();

    const columnVirtualizer = useVirtualizer({
      count: centerColumns.length,
      enabled: centerColumns.length > COL_VIRTUALIZATION_THRESHOLD,
      estimateSize: (index) => table.getColumnSize(centerColumns[index]),
      getItemKey: (index) => centerColumns[index].id,
      getScrollElement: () => scrollContainerRef.current,
      horizontal: true,
    });
    const virtualColumns = columnVirtualizer.getVirtualItems();

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
    const showEmpty =
      loading !== true &&
      rows.length === 0 &&
      empty !== undefined &&
      empty !== null &&
      empty !== false &&
      empty !== "";

    /**
     * Virtualized rows and columns are missing from the DOM, so assistive
     * technology relies on these counts and indexes for the real table size.
     */
    const headerGroups = table.getHeaderGroups();
    const totalResizableSize =
      headerGroups[0]?.headers.reduce(
        (sum, header) =>
          sum +
          (table.getCanGrow(header.column) ? table.getHeaderSize(header) : 0),
        0,
      ) ?? 0;

    const leadingSpacerStyle = columnVirtualizer.options.enabled
      ? getSpacerStyle(
          table,
          centerColumns.slice(0, virtualColumns[0]?.index ?? 0),
          totalResizableSize,
        )
      : undefined;
    const trailingSpacerStyle = columnVirtualizer.options.enabled
      ? getSpacerStyle(
          table,
          centerColumns.slice(
            (virtualColumns.at(-1)?.index ?? centerColumns.length) + 1,
          ),
          totalResizableSize,
        )
      : undefined;
    const columnIndexes = new Map(
      [
        ...table.getPinnedColumns("left"),
        ...centerColumns,
        ...table.getPinnedColumns("right"),
      ].map((column, index) => [column.id, index + 1]),
    );

    return (
      <Box
        ref={ref}
        style={{
          ...assignInlineVars({
            [styles.leftTotalSizeVar]: `${table.getPinnedTotalSize("left")}px`,
            [styles.rightTotalSizeVar]: `${table.getPinnedTotalSize("right")}px`,
            [styles.totalSizeVar]: totalResizableSize.toString(),
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
            (loading === true
              ? SKELETON_ROW_COUNT
              : showEmpty
                ? 1
                : rows.length)
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
                    pinned={!!table.getPinned(header.column)}
                    style={{
                      ...assignInlineVars({
                        [styles.cellOffsetVar]: `${table.getColumnStart(header.column, table.getPinned(header.column) || "left")}px`,
                        [styles.cellSizeVar]: `${table.getHeaderSize(header)}`,
                      }),
                    }}
                    {...styles.cell({
                      pinned: table.getPinned(header.column) || undefined,
                      pinnedType: table.getPinned(header.column)
                        ? "header"
                        : undefined,
                      resizable: table.getCanGrow(header.column),
                    })}
                  >
                    {header.isPlaceholder
                      ? null
                      : render(
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
              rowVirtualizer.options.enabled && !showEmpty
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
                {table.getPinnedCells(row, "left").map((cell) => (
                  <TableCell
                    aria-colindex={columnIndexes.get(cell.column.id)}
                    key={cell.id}
                    pinned
                    style={{
                      ...assignInlineVars({
                        [styles.cellOffsetVar]: `${table.getColumnStart(cell.column, "left")}px`,
                        [styles.cellSizeVar]: `${table.getColumnSize(cell.column)}`,
                      }),
                    }}
                    {...styles.cell({
                      pinned: "left",
                      pinnedType: "body",
                      resizable: table.getCanGrow(cell.column),
                    })}
                  >
                    {render(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}

                {leadingSpacerStyle && (
                  <TableCell aria-hidden p="0" style={leadingSpacerStyle} />
                )}

                {(columnVirtualizer.options.enabled
                  ? virtualColumns.map((virtualCell) => {
                      const cells = table.getCenterCells(row);
                      return cells[virtualCell.index];
                    })
                  : table.getCenterCells(row)
                ).map((cell) => (
                  <TableCell
                    aria-colindex={columnIndexes.get(cell.column.id)}
                    key={cell.id}
                    style={{
                      ...assignInlineVars({
                        [styles.cellSizeVar]: `${table.getColumnSize(cell.column)}`,
                      }),
                    }}
                    {...styles.cell({
                      resizable: table.getCanGrow(cell.column),
                    })}
                  >
                    {render(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}

                {trailingSpacerStyle && (
                  <TableCell aria-hidden p="0" style={trailingSpacerStyle} />
                )}

                {table.getPinnedCells(row, "right").map((cell) => (
                  <TableCell
                    aria-colindex={columnIndexes.get(cell.column.id)}
                    key={cell.id}
                    pinned
                    style={{
                      ...assignInlineVars({
                        [styles.cellOffsetVar]: `${table.getColumnStart(cell.column, "right")}px`,
                        [styles.cellSizeVar]: `${table.getColumnSize(cell.column)}`,
                      }),
                    }}
                    {...styles.cell({
                      pinned: "right",
                      pinnedType: "body",
                      resizable: table.getCanGrow(cell.column),
                    })}
                  >
                    {render(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </DataTableRow>
            ))}

            {showEmpty && (
              <TableRow
                aria-rowindex={headerGroups.length + 1}
                {...styles.emptyRow()}
              >
                <TableCell
                  aria-colindex={1}
                  colSpan={columnIndexes.size}
                  flex="1"
                  p="0"
                >
                  <Box {...styles.empty()}>{empty}</Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
    );
  },
);

DataTableBody.displayName = "@optiaxiom/react/DataTableBody";

/**
 * Sizes a cell standing in for unrendered center columns so body rows match
 * the header's width and split its free space in the same ratio.
 */
const getSpacerStyle = (
  table: TableAdapter,
  columns: TanStackColumn[],
  totalResizableSize: number,
) => {
  if (columns.length === 0) {
    return;
  }

  let size = 0;
  let resizableSize = 0;
  for (const column of columns) {
    size += table.getColumnSize(column);
    resizableSize += table.getCanGrow(column) ? table.getColumnSize(column) : 0;
  }
  return {
    flexGrow: totalResizableSize ? resizableSize / totalResizableSize : 0,
    width: `${size}px`,
  };
};

import { flexRender, type Table as ReactTable } from "@tanstack/react-table";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { createElement, forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { DataTableHeaderCell } from "../data-table-header-cell";
import { Pagination } from "../pagination";
import { Table } from "../table";
import { TableBody } from "../table-body";
import { TableCell } from "../table-cell";
import { TableHead } from "../table-head";
import { TableHeaderCell } from "../table-header-cell";
import { TableRow } from "../table-row";
import * as styles from "./DataTable.css";

type DataTableProps = BoxProps<
  "div",
  {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    table: ReactTable<any>;
  }
>;

export const DataTable = forwardRef<HTMLDivElement, DataTableProps>(
  ({ table, ...props }, ref) => {
    let offset = 0;
    const offsets = Object.fromEntries(
      table
        .getAllColumns()
        .flatMap((column) => [
          [column.id, (offset += column.getSize()) - column.getSize()],
        ]),
    );

    return (
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        {...props}
        ref={ref}
      >
        <Table>
          <TableHead {...styles.tableHeader()}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHeaderCell
                      aria-sort={
                        header.column.columnDef.enableSorting &&
                        header.column.getIsSorted() !== false
                          ? header.column.getIsSorted() === "desc"
                            ? "descending"
                            : "ascending"
                          : "none"
                      }
                      key={header.id}
                      style={{
                        ...assignInlineVars({
                          [styles.cellOffsetVar]: header.column.getIsPinned()
                            ? `${offsets[header.column.id]}px`
                            : undefined,
                          [styles.columnWidthVar]: `${header.getSize()}px`,
                        }),
                      }}
                      {...styles.tableHead({
                        pinned: header.column.getIsPinned() ?? undefined,
                      })}
                    >
                      {header.column.columnDef.header &&
                      typeof header.column.columnDef.header !== "string" ? (
                        createElement(
                          header.column.columnDef.header,
                          header.getContext(),
                        )
                      ) : (
                        <DataTableHeaderCell {...header.getContext()}>
                          {header.column.columnDef.header}
                        </DataTableHeaderCell>
                      )}
                    </TableHeaderCell>
                  );
                })}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell
                      key={cell.id}
                      style={{
                        ...assignInlineVars({
                          [styles.cellOffsetVar]: cell.column.getIsPinned()
                            ? `${offsets[cell.column.id]}px`
                            : undefined,
                          [styles.columnWidthVar]: `${cell.column.getSize()}px`,
                        }),
                      }}
                      {...styles.tableCell({
                        pinned: cell.column.getIsPinned() ?? undefined,
                      })}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  );
                })}
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

import { flexRender, type Table as ReactTable } from "@tanstack/react-table";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { DataTableHeaderCell } from "../data-table-header-cell";
import { Pagination } from "../pagination";
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
     * Pass the table instance returned from `useReactTable()` hook.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    table: ReactTable<any>;
  }
>;

export const DataTable = forwardRef<HTMLDivElement, DataTableProps>(
  ({ table, ...props }, ref) => {
    let offsetLeft = 0;
    let offsetRight = table.getTotalSize();
    const offsets = Object.fromEntries(
      table.getAllColumns().flatMap((column) => [
        [
          column.id,
          {
            left: (offsetLeft += column.getSize()) - column.getSize(),
            right: (offsetRight -= column.getSize()),
          },
        ],
      ]),
    );

    return (
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        ref={ref}
        {...props}
      >
        <Table
          layout="fixed"
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
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <DataTableHeaderCell
                    header={header}
                    key={header.id}
                    style={{
                      ...assignInlineVars({
                        [styles.cellOffsetVar]: `${offsets[header.column.id][header.column.getIsPinned() || "left"]}px`,
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
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </DataTableHeaderCell>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell
                      key={cell.id}
                      style={{
                        ...assignInlineVars({
                          [styles.cellOffsetVar]: `${offsets[cell.column.id][cell.column.getIsPinned() || "left"]}px`,
                          [styles.cellSizeVar]: `${cell.column.getSize()}px`,
                        }),
                      }}
                      {...styles.cell({
                        pinned: cell.column.getIsPinned() || undefined,
                        pinnedType: cell.column.getIsPinned()
                          ? "body"
                          : undefined,
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

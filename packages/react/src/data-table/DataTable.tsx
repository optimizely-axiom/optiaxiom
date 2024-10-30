import type { TableOptions } from "@tanstack/react-table";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { createElement } from "react";

import { Box } from "../box";
import { DataTableHeader } from "../data-table-header";
import { Pagination } from "../pagination";
import { Table } from "../table";
import { TableBody } from "../table-body";
import { TableCell } from "../table-cell";
import { TableHead } from "../table-head";
import { TableHeaderCell } from "../table-header-cell";
import { TableRow } from "../table-row";
import * as styles from "./DataTable.css";

type DataTableProps<TData> = TableOptions<TData>;

export const DataTable = <TData,>({
  columns,
  data,
  ...props
}: DataTableProps<TData>) => {
  const table = useReactTable({
    ...props,
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  let offset = 0;
  const offsets = Object.fromEntries(
    table
      .getAllColumns()
      .flatMap((column) => [
        [column.id, (offset += column.getSize()) - column.getSize()],
      ]),
  );

  return (
    <Box alignItems="center" display="flex" flexDirection="column">
      <Table>
        <TableHead {...styles.tableHeader()}>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHeaderCell
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
                      <DataTableHeader {...header.getContext()}>
                        {header.column.columnDef.header}
                      </DataTableHeader>
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {data.length > table.getState().pagination.pageSize && (
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
};

import {
  type ColumnDef,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import React from "react";

import { Box } from "../box";
import { Button } from "../button";
import { IconSort } from "../icons/IconSort";
import { Pagination } from "../pagination";
import { Table } from "../table";
import { TableBody } from "../table-body";
import { TableCell } from "../table-cell";
import { TableHead } from "../table-head";
import { TableHeader } from "../table-header";
import { TableRow } from "../table-row";
import { Tooltip } from "../tooltip";
import * as styles from "./DataTable.css";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pinnedColumns?: string[];
}

export type { ColumnDef };

export const DataTable = <TData, TValue>({
  columns,
  data,
  pinnedColumns = [],
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const [{ pageIndex, pageSize }, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const pagination = {
    pageIndex,
    pageSize,
  };

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    state: {
      columnPinning: { left: pinnedColumns },
      pagination,
      sorting,
    },
  });

  const totalPages = table.getPageCount();

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
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    {...styles.tableHead({
                      pinned: header.column.getIsPinned() ? true : undefined,
                    })}
                    style={{
                      ...assignInlineVars({
                        [styles.cellOffset]: header.column.getIsPinned()
                          ? `${offsets[header.column.id]}px`
                          : undefined,
                        [styles.columnWidth]: `${header.getSize()}px`,
                      }),
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                    {header.column.columnDef.enableSorting && (
                      <Tooltip
                        content={
                          header.column.getCanSort()
                            ? header.column.getNextSortingOrder() === "asc"
                              ? "Sort ascending"
                              : header.column.getNextSortingOrder() === "desc"
                                ? "Sort descending"
                                : "Clear sort"
                            : undefined
                        }
                      >
                        <Button
                          border="0"
                          icon={
                            <IconSort
                              sortDirection={
                                header.column.getIsSorted() as
                                  | "asc"
                                  | "desc"
                                  | false
                              }
                            />
                          }
                          onClick={() => header.column.toggleSorting()}
                        />
                      </Tooltip>
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => {
                return (
                  <TableCell
                    {...styles.tableCell({
                      pinned: cell.column.getIsPinned() ? true : undefined,
                    })}
                    key={cell.id}
                    style={{
                      ...assignInlineVars({
                        [styles.cellOffset]: cell.column.getIsPinned()
                          ? `${offsets[cell.column.id]}px`
                          : undefined,
                        [styles.columnWidth]: `${cell.column.getSize()}px`,
                      }),
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Box mt="8">
        <Pagination
          onPageChange={(newPage) => table.setPageIndex(newPage - 1)}
          page={pageIndex + 1}
          total={totalPages}
        />
      </Box>
    </Box>
  );
};

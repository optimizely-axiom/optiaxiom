import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";

import { Box } from "../box";
import { Pagination } from "../pagination";
import { Table } from "../table";
import { TableBody } from "../table-body";
import { TableCell } from "../table-cell";
import { TableHead } from "../table-head";
import { TableHeader } from "../table-header";
import { TableRow } from "../table-row";
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
    onPaginationChange: setPagination,
    state: {
      columnPinning: { left: pinnedColumns },
      pagination,
    },
  });

  const totalPages = table.getPageCount();

  return (
    <Box alignItems="center" display="flex" flexDirection="column">
      <Box style={{ overflowX: "auto", position: "relative", width: "100%" }}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const isPinned = pinnedColumns.includes(header.column.id);
                  return (
                    <TableHead
                      {...styles.tableHead({
                        pinned: isPinned ? "left" : undefined,
                      })}
                      colSpan={header.colSpan}
                      key={header.id}
                      style={{
                        left: isPinned
                          ? `${header.getStart("left")}px`
                          : undefined,
                        width: `${header.getSize()}px`,
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
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
                  const isPinned = pinnedColumns.includes(cell.column.id);
                  return (
                    <TableCell
                      {...styles.tableCell({
                        pinned: isPinned ? "left" : undefined,
                      })}
                      key={cell.id}
                      style={{
                        left: isPinned
                          ? `${cell.column.getStart("left")}px`
                          : undefined,
                        width: `${cell.column.getSize()}px`,
                      }}
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
      </Box>

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

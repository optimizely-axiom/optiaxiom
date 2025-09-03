"use client";

import { DataTable, DataTableBody } from "@optiaxiom/react";
import {
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { columns } from "./columns";
import { data } from "./data";

export function App() {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSubRows: (row) => row.items,
  });
  return (
    <DataTable table={table}>
      <DataTableBody />
    </DataTable>
  );
}

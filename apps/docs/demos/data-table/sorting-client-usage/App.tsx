"use client";

import { DataTable, DataTableBody } from "@optiaxiom/react";
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { columns } from "./columns";
import { data } from "./data";

export function App() {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  return (
    <DataTable maxH="xs" table={table}>
      <DataTableBody />
    </DataTable>
  );
}

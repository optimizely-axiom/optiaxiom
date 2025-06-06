"use client";

import { DataTable, DataTableBody } from "@optiaxiom/react";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { columns } from "./columns";
import { data } from "./data";

export function App() {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    state: { pagination: { pageIndex: 0, pageSize: data.length } },
  });
  return (
    <DataTable maxH="xs" table={table}>
      <DataTableBody />
    </DataTable>
  );
}

"use client";

import { DataTable, DataTableBody } from "@optiaxiom/react";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { columns } from "./columns";

export function App() {
  const table = useReactTable({
    columns,
    data: [],
    enableSorting: false,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <DataTable table={table}>
      <DataTableBody empty="No payments yet." />
    </DataTable>
  );
}

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
  });
  return (
    <DataTable table={table}>
      <DataTableBody />
    </DataTable>
  );
}

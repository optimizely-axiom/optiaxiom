"use client";

import { DataTable } from "@optiaxiom/react/unstable";
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
  return <DataTable maxH="xs" table={table} />;
}

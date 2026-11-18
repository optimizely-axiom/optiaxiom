"use client";

import { DataTable, DataTableBody, DataTableFooter } from "@optiaxiom/react";
import { useTable } from "@tanstack/react-table";

import { columns, features } from "./columns";
import { data } from "./data";

export function App() {
  const table = useTable({
    columns,
    data,
    features,
    initialState: { pagination: { pageIndex: 0, pageSize: 10 } },
  });
  return (
    <DataTable maxH="xs" table={table}>
      <DataTableBody />
      <DataTableFooter />
    </DataTable>
  );
}

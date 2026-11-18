"use client";

import { DataTable, DataTableBody } from "@optiaxiom/react";
import { useTable } from "@tanstack/react-table";

import { columns, features } from "./columns";
import { data } from "./data";

export function App() {
  const table = useTable({
    columns,
    data,
    features,
    state: {
      columnPinning: {
        end: [],
        start: ["id", "username"],
      },
    },
  });
  return (
    <DataTable maxH="xs" table={table}>
      <DataTableBody />
    </DataTable>
  );
}

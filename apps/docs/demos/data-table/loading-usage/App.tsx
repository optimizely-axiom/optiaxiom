"use client";

import { DataTable, DataTableBody, Group, Switch } from "@optiaxiom/react";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react";

import { columns } from "./columns";

export function App() {
  const [data] = useState([]);
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  const [loading, setLoading] = useState(true);

  return (
    <Group alignItems="start" flexDirection="column" gap="16" maxW="full">
      <Switch checked={loading} onCheckedChange={setLoading}>
        Loading
      </Switch>
      <DataTable maxH="xs" table={table}>
        <DataTableBody loading={loading} />
      </DataTable>
    </Group>
  );
}

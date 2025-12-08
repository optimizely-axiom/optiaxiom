"use client";

import { DataTable, DataTableBody, Group, Switch } from "@optiaxiom/react";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react";

import { columns } from "./columns";
import { data } from "./data";

export function App() {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id.toString(),
  });

  const [loading, setLoading] = useState<Record<string, "sub-rows" | false>>({
    "1": "sub-rows",
  });

  return (
    <Group alignItems="start" flexDirection="column" gap="16" maxW="full">
      <Switch
        checked={loading["1"] === "sub-rows"}
        onCheckedChange={(checked) =>
          setLoading({ "1": checked ? "sub-rows" : false })
        }
      >
        Loading
      </Switch>
      <DataTable maxH="xs" table={table}>
        <DataTableBody loading={loading} />
      </DataTable>
    </Group>
  );
}

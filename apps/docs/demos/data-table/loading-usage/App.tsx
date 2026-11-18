"use client";

import { DataTable, DataTableBody, Group, Switch } from "@optiaxiom/react";
import { useTable } from "@tanstack/react-table";
import { useState } from "react";

import { columns, features } from "./columns";

export function App() {
  const [data] = useState([]);
  const table = useTable({
    columns,
    data,
    features,
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

"use client";

import { Flex, Switch } from "@optiaxiom/react";
import { DataTable, DataTableBody } from "@optiaxiom/react/unstable";
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
    <Flex alignItems="start" maxW="full">
      <Switch checked={loading} onCheckedChange={setLoading}>
        Loading
      </Switch>

      <DataTable maxH="xs" table={table}>
        <DataTableBody loading={loading} />
      </DataTable>
    </Flex>
  );
}

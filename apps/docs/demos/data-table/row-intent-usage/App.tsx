"use client";

import { DataTable, DataTableBody } from "@optiaxiom/react";
import { useTable } from "@tanstack/react-table";
import { useMemo, useState } from "react";

import { columns, features } from "./columns";
import { data } from "./data";

export function App() {
  const [openId, setOpenId] = useState<null | string>("2");
  const table = useTable({
    columns: useMemo(() => columns(setOpenId), []),
    data,
    features,
    getRowId: (row) => row.id,
    getRowIntent: (row) => (row.id === openId ? "primary" : undefined),
  });

  return (
    <DataTable selectionBehavior="toggle" table={table}>
      <DataTableBody />
    </DataTable>
  );
}

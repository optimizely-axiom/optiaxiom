"use client";

import { DataTable, DataTableBody } from "@optiaxiom/react";
import { type SortingState, useTable } from "@tanstack/react-table";
import { useMemo, useState } from "react";

import { columns, features } from "./columns";
import { data } from "./data";

export function App() {
  const [sorting, setSorting] = useState([
    {
      desc: false,
      id: "firstName",
    },
  ]);

  const table = useTable({
    columns,
    data: useMemo(() => sortData(sorting), [sorting]),
    features,
    onSortingChange: setSorting,
    state: { sorting },
  });
  return (
    <DataTable maxH="xs" table={table}>
      <DataTableBody />
    </DataTable>
  );
}

/**
 * Simulate sorting data from server.
 */
const sortData = (sorting: SortingState) =>
  data.toSorted((a, b) => {
    for (const state of sorting) {
      if (
        !(
          state.id === "amount" ||
          state.id === "firstName" ||
          state.id === "lastName"
        )
      ) {
        return 0;
      }

      const result =
        (state.desc ? -1 : 1) *
        a[state.id].localeCompare(b[state.id], undefined, { numeric: true });
      if (result !== 0) {
        return result;
      }
    }
    return 0;
  });

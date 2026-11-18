"use client";

import { DataTable, DataTableBody, DataTableFooter } from "@optiaxiom/react";
import { useTable } from "@tanstack/react-table";
import { useMemo, useState } from "react";

import { columns, features } from "./columns";
import { data } from "./data";

/**
 * Simulate fetching data from server.
 */
const fetchData = ({ pageIndex = 0, pageSize = 10 }) =>
  data.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);

export function App() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useTable({
    columns,
    data: useMemo(() => fetchData(pagination), [pagination]),
    features,
    manualPagination: true,
    onPaginationChange: setPagination,
    rowCount: data.length,
    state: { pagination },
  });
  return (
    <DataTable maxH="xs" table={table}>
      <DataTableBody />
      <DataTableFooter />
    </DataTable>
  );
}

"use client";

import {
  DataTable,
  DataTableBody,
  DataTableFooter,
} from "@optiaxiom/react/unstable";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo, useState } from "react";

import { columns } from "./columns";
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

  const table = useReactTable({
    columns,
    data: useMemo(() => fetchData(pagination), [pagination]),
    getCoreRowModel: getCoreRowModel(),
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

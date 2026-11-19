"use client";

import { DataTable, DataTableBody, Flex, Text } from "@optiaxiom/react";
import { useTable } from "@tanstack/react-table";
import { useState } from "react";

import { columns, features } from "./columns";
import { data } from "./data";

export function App() {
  const [highlightedRowId, setHighlightedRowId] = useState<null | string>(null);
  const table = useTable({
    columns,
    data,
    features,
    getRowId: (row) => String(row.id),
    onHighlightedRowIdChange: setHighlightedRowId,
    state: { highlightedRowId },
  });
  const highlighted = highlightedRowId
    ? table.getRowModel().rowsById[highlightedRowId]?.original
    : undefined;

  return (
    <Flex w="full">
      <DataTable table={table}>
        <DataTableBody />
      </DataTable>
      <Text role="status">
        {highlighted
          ? `Highlighted: ${highlighted.name}`
          : "Tab into the table and use the arrow keys."}
      </Text>
    </Flex>
  );
}

"use client";

import type { Table } from "@tanstack/table-core";

import { createContext } from "@radix-ui/react-context";

export const [DataTableProvider, useDataTableContext] = createContext<{
  highlightedIndex: number;
  setHighlightedIndex: (highlightedIndex: number) => void;
  table: Table<unknown>;
}>("@optiaxiom/react/DataTable");

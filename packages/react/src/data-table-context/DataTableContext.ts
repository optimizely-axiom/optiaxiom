"use client";

import type { Table } from "@tanstack/table-core";

import { createContext } from "@radix-ui/react-context";

export const [DataTableContextProvider, useDataTableContext] = createContext<{
  table: Table<unknown>;
}>("DataTable");

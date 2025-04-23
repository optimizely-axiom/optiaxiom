"use client";

import type { Table } from "@tanstack/table-core";

import { Context } from "radix-ui/internal";

export const [DataTableProvider, useDataTableContext] = Context.createContext<{
  table: Table<unknown>;
}>("@optiaxiom/react/DataTable");

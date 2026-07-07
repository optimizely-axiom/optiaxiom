"use client";

import { createContext } from "@radix-ui/react-context";

/**
 * Holds the current `DataTable` row while a column's `cell` template renders.
 * `DataTableRow` reads from here to give the cell pointer access to its row,
 * the same way `MapIndex` exposes the current index inside a `Map`.
 */
export const [ProteusDataTableRowProvider, useProteusDataTableRowContext] =
  createContext<{
    row: Record<string, unknown> | undefined;
  }>("@optiaxiom/proteus/ProteusDataTableRow", {
    row: undefined,
  });

"use client";

import type { MutableRefObject } from "react";

import { createContext } from "@radix-ui/react-context";

import type { TableAdapter } from "./tanstack";

export const [DataTableProvider, useDataTableContext] = createContext<{
  /**
   * Set when keyboard navigation should move focus to the next highlighted
   * row; rows that mount or re-index while highlighted leave focus alone.
   */
  focusRequestRef: MutableRefObject<boolean>;
  highlightedIndex: number;
  setHighlightedIndex: (highlightedIndex: number) => void;
  table: TableAdapter;
}>("@optiaxiom/react/DataTable");

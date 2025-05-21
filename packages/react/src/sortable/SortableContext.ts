"use client";

import { createContext } from "@radix-ui/react-context";

export const [SortableProvider, useSortableContext] = createContext<{
  index: number;
  isSorting: boolean;
  item: string;
}>("@optiaxiom/react/Sortable");

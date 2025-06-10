"use client";

import type { MutableRefObject, ReactNode } from "react";

import { createContext } from "@radix-ui/react-context";

export const [SortableProvider, useSortableContext] = createContext<{
  cacheRef: MutableRefObject<Map<string, ReactNode>>;
  isSorting: boolean;
}>("@optiaxiom/react/Sortable");

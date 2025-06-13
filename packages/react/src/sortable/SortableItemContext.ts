"use client";

import type { RefObject } from "react";

import { createContext } from "@radix-ui/react-context";

export const [SortableItemProvider, useSortableItemContext] = createContext<{
  handleRef: RefObject<HTMLElement>;
  isDragging: boolean;
}>("@optiaxiom/react/SortableItem");

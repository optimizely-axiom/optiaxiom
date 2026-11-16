"use client";

import { createContext } from "@radix-ui/react-context";

export const [SortableItemProvider, useSortableItemContext] = createContext<{
  handleRef: (element: HTMLElement | null) => void;
  isDragging: boolean;
}>("@optiaxiom/react/SortableItem");

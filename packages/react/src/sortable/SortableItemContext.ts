"use client";

import type { UniqueIdentifier } from "@dnd-kit/abstract";

import { createContext } from "@radix-ui/react-context";

export const [SortableItemProvider, useSortableItemContext] = createContext<{
  handleRef: (element: HTMLElement | null) => void;
  id: UniqueIdentifier;
  isDragging: boolean;
  sourceRef: (element: HTMLElement | null) => void;
}>("@optiaxiom/react/SortableItem");

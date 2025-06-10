"use client";

import { createContext } from "@radix-ui/react-context";

export const [SortableListContainerProvider, useSortableListContainerContext] =
  createContext<{
    elementRef: (element: Element | null) => void;
    id: string;
    index: number;
    isDropTarget: boolean;
    items: Record<string, string[]> | string[];
    setHasDropTarget: (flag: boolean) => void;
  }>("@optiaxiom/react/SortableListContainer");

"use client";

import type { RefObject } from "react";

import { createContext } from "@radix-ui/react-context";

export const [SortableItemContainerProvider, useSortableItemContainerContext] =
  createContext<{
    elementRef: (element: Element | null) => void;
    handleRef: RefObject<HTMLDivElement>;
    id: string;
    index: number;
    isDragging: boolean;
  }>("@optiaxiom/react/SortableItemContainer", {
    elementRef: () => {},
    handleRef: { current: null },
    id: "",
    index: -1,
    isDragging: false,
  });

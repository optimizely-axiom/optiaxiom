"use client";

import { createContext } from "@radix-ui/react-context";

export const [SortableGroupProvider, useSortableGroupContext] = createContext<{
  id: string | undefined;
  setHasDropTarget: (flag: boolean) => void;
}>("@optiaxiom/react/SortableGroup", {
  id: undefined,
  setHasDropTarget: () => {},
});

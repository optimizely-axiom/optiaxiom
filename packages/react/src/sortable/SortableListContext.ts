"use client";

import { createContext } from "@radix-ui/react-context";

export const [SortableListProvider, useSortableListContext] = createContext<{
  id: string | undefined;
  setHasDropTarget: (flag: boolean) => void;
}>("@optiaxiom/react/SortableList", {
  id: undefined,
  setHasDropTarget: () => {},
});

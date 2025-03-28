"use client";

import { createContext } from "@radix-ui/react-context";

export const [DropdownMenuNestedProvider, useDropdownMenuNestedContext] =
  createContext<{
    open: boolean | undefined;
  }>("@optiaxiom/react/DropdownMenuNested");

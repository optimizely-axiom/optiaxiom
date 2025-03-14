"use client";

import { createContext } from "@radix-ui/react-context";

export const [DropdownMenuSubProvider, useDropdownMenuSubContext] =
  createContext<{
    open: boolean | undefined;
  }>("@optiaxiom/react/DropdownMenuSub");

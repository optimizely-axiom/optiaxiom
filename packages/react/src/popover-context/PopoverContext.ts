"use client";

import { createContext } from "@radix-ui/react-context";

export const [PopoverContextProvider, usePopoverContext] = createContext<{
  open: boolean | undefined;
}>("Popover");

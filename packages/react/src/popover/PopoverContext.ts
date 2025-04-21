"use client";

import { createContext } from "@radix-ui/react-context";

export const [PopoverProvider, usePopoverContext] = createContext<{
  open: boolean | undefined;
  presence: boolean | undefined;
  setPresence: (presence: boolean) => void;
}>("@optiaxiom/react/Popover");

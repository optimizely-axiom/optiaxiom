"use client";

import { Context } from "radix-ui/internal";

export const [PopoverProvider, usePopoverContext] = Context.createContext<{
  open: boolean | undefined;
  presence: boolean | undefined;
  setPresence: (presence: boolean) => void;
}>("@optiaxiom/react/Popover");

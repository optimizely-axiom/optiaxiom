"use client";

import { Context } from "radix-ui/internal";

export const [DropdownMenuSubProvider, useDropdownMenuSubContext] =
  Context.createContext<{
    open: boolean | undefined;
    presence: boolean | undefined;
    setPresence: (presence: boolean) => void;
  }>("@optiaxiom/react/DropdownMenuSub");

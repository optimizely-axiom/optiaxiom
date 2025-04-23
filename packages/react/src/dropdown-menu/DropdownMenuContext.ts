"use client";

import { Context } from "radix-ui/internal";

export const [DropdownMenuProvider, useDropdownMenuContext] =
  Context.createContext<{
    open: boolean | undefined;
    presence: boolean | undefined;
    setOpen: (open: boolean) => void;
    setPresence: (presence: boolean) => void;
  }>("@optiaxiom/react/DropdownMenu");

"use client";

import { createContext } from "@radix-ui/react-context";

export const [DropdownMenuProvider, useDropdownMenuContext] = createContext<{
  open: boolean | undefined;
  presence: boolean | undefined;
  setOpen: (open: boolean) => void;
  setPresence: (presence: boolean) => void;
}>("@optiaxiom/react/DropdownMenu");

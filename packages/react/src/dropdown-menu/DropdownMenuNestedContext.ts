"use client";

import { Context } from "radix-ui/internal";

export const [DropdownMenuNestedProvider, useDropdownMenuNestedContext] =
  Context.createContext<{
    open: boolean | undefined;
  }>("@optiaxiom/react/DropdownMenuNested");

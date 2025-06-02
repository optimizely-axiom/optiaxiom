"use client";

import { createContext } from "@radix-ui/react-context";

export const [PopoverContentProvider, usePopoverContentContext] =
  createContext<{
    side: "bottom" | "left" | "right" | "top" | undefined;
  }>("@optiaxiom/react/PopoverContent", { side: undefined });

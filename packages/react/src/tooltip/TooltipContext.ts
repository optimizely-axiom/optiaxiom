"use client";

import { createContext } from "@radix-ui/react-context";

export const [TooltipProvider, useTooltipContext] = createContext<{
  auto: boolean | undefined;
  open: boolean | undefined;
  setOpen: (open: boolean) => void;
}>("@optiaxiom/react/Tooltip");

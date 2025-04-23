"use client";

import type { RefObject } from "react";

import { Context } from "radix-ui/internal";

export const [TooltipProvider, useTooltipContext] = Context.createContext<{
  open?: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: RefObject<HTMLButtonElement>;
}>("@optiaxiom/react/Tooltip");

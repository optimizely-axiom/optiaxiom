import type { RefObject } from "react";

import { createContext } from "@radix-ui/react-context";

export const [TooltipContextProvider, useTooltipContext] = createContext<{
  open?: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: RefObject<HTMLButtonElement>;
}>("TooltipRoot");

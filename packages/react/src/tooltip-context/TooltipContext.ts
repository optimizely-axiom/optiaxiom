import type { RefObject } from "react";

import { createContext } from "@radix-ui/react-context";

export const [TooltipContextProvider, useTooltipContext] = createContext<{
  keepOpenOnActivation?: boolean;
  open?: boolean;
  setOpen: (open: boolean) => void;
  side?: "bottom" | "left" | "right" | "top";
  theme: "dark" | "light"; // remove
  triggerRef: RefObject<HTMLButtonElement>;
}>("Tooltip");

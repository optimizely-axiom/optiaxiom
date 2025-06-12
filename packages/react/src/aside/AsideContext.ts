"use client";

import { createContext } from "@radix-ui/react-context";

export const [AsideProvider, useDialogContext] = createContext<{
  nestedDialogCount: number;
  open?: boolean;
}>("@optiaxiom/react/Aside");

"use client";

import { createContext } from "@radix-ui/react-context";

export const [DialogProvider, useDialogContext] = createContext<{
  nestedDialogCount: number;
  open?: boolean;
}>("@optiaxiom/react/Dialog");

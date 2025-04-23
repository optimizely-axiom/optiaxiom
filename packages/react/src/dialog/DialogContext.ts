"use client";

import { Context } from "radix-ui/internal";

export const [DialogProvider, useDialogContext] = Context.createContext<{
  nestedDialogCount: number;
  open?: boolean;
}>("@optiaxiom/react/Dialog");

"use client";

import { Context } from "radix-ui/internal";

export const [AlertDialogProvider, useAlertDialogContext] =
  Context.createContext<{
    nestedDialogCount: number;
    open?: boolean;
    presence: boolean | undefined;
    setPresence: (presence: boolean) => void;
  }>("@optiaxiom/react/AlertDialog");

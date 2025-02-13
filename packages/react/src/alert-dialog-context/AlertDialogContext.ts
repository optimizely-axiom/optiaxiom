"use client";

import { createContext } from "@radix-ui/react-context";

export const [AlertDialogContextProvider, useAlertDialogContext] =
  createContext<{
    nestedDialogCount: number;
    open?: boolean;
    presence: boolean | undefined;
    setPresence: (presence: boolean) => void;
  }>("AlertDialog");

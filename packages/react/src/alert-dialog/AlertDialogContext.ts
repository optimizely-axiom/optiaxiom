"use client";

import { createContext } from "@radix-ui/react-context";

export const [AlertDialogProvider, useAlertDialogContext] = createContext<{
  nestedDialogCount: number;
  open?: boolean;
  presence: boolean | undefined;
  setPresence: (presence: boolean) => void;
}>("@optiaxiom/react/AlertDialog");

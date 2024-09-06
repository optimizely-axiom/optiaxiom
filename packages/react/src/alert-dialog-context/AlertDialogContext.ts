import type { ComponentPropsWithoutRef } from "react";

import { createContext } from "@radix-ui/react-context";

import type { AlertDialogContent } from "../alert-dialog-content";

export const [AlertDialogContextProvider, useAlertDialogContext] =
  createContext<
    {
      open?: boolean;
    } & Partial<
      Pick<ComponentPropsWithoutRef<typeof AlertDialogContent>, "appearance">
    >
  >("AlertDialog");

import { createContext } from "@radix-ui/react-context";

export const [AlertDialogContextProvider, useAlertDialogContext] =
  createContext<{
    open?: boolean;
  }>("AlertDialog");

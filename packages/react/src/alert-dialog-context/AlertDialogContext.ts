import { createContext } from "@radix-ui/react-context";

export const [AlertDialogContextProvider, useAlertDialogContext] =
  createContext<{
    appearance?: "danger" | "primary";
  }>("AlertDialog");

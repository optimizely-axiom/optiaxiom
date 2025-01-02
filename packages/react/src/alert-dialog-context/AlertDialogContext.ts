import { createContext } from "@radix-ui/react-context";

export const [AlertDialogContextProvider, useAlertDialogContext] =
  createContext<{
    isRootDialog: boolean;
    nestedDialogCount: number;
    open?: boolean;
  }>("AlertDialog");

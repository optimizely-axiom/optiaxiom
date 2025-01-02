import { createContext } from "@radix-ui/react-context";

export const [DialogContextProvider, useDialogContext] = createContext<{
  isRootDialog: boolean;
  nestedDialogCount: number;
  open?: boolean;
}>("Dialog");

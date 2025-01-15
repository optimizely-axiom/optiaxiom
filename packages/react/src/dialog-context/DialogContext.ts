import { createContext } from "@radix-ui/react-context";

export const [DialogContextProvider, useDialogContext] = createContext<{
  nestedDialogCount: number;
  open?: boolean;
}>("Dialog");

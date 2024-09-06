import { createContext } from "@radix-ui/react-context";

export const [DialogContextProvider, useDialogContext] = createContext<{
  open?: boolean;
}>("Dialog");

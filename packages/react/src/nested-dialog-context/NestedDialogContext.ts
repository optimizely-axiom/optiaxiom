import { createContext } from "@radix-ui/react-context";

export const [NestedDialogContextProvider, useNestedDialogContext] =
  createContext<null | {
    onCountChange: (count: number) => void;
  }>("NestedDialog", null);

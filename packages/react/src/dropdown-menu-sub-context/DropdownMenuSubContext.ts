import { createContext } from "@radix-ui/react-context";

export const [DropdownMenuSubContextProvider, useDropdownMenuSubContext] =
  createContext<{
    open: boolean | undefined;
  }>("MenuSub");

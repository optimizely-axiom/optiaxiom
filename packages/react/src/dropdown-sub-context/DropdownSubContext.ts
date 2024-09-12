import { createContext } from "@radix-ui/react-context";

export const [DropdownSubContextProvider, useDropdownSubContext] =
  createContext<{
    open: boolean | undefined;
  }>("SubMenu");

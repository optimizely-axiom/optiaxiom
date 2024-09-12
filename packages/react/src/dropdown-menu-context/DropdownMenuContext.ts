import { createContext } from "@radix-ui/react-context";

export const [DropdownMenuContextProvider, useDropdownMenuContext] =
  createContext<{
    open: boolean | undefined;
  }>("DropdownMenu");

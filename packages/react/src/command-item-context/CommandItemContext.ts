import { createContext } from "@radix-ui/react-context";

export const [CommandItemContextProvider, useCommandItemContext] =
  createContext<{
    active: boolean | undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    item: any;
  }>("CommandItem");

import { createContext } from "@radix-ui/react-context";

export const [MenuContextProvider, useMenuContext] = createContext<{
  open: boolean | undefined;
}>("Menu");

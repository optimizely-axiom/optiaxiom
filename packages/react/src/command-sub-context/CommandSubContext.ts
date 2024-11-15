import { createContext } from "@radix-ui/react-context";

export const [CommandSubContextProvider, useCommandSubContext] = createContext<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any;
}>("CommandSub");

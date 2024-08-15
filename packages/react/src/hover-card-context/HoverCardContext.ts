import { createContext } from "@radix-ui/react-context";

export const [HoverCardContextProvider, useHoverCardContext] = createContext<{
  open?: boolean;
}>("HoverCard");

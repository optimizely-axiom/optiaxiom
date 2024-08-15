import { createContext } from "@radix-ui/react-context";

export const [HoverCardContextProvider, useHoverCardContext] = createContext<{
  keepOpenOnActivation?: boolean;
  open?: boolean;
  setOpen: (open: boolean) => void;
}>("HoverCard");

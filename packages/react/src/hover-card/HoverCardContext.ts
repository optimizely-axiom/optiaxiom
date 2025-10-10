import { createContext } from "@radix-ui/react-context";

export const [HoverCardContextProvider, useHoverCardContext] = createContext<{
  open: boolean | undefined;
  presence: boolean | undefined;
  setPresence: (presence: boolean) => void;
}>("@optiaxiom/react/HoverCardContext");

import { createContext } from "react";

export const HoverCardContext = createContext<{ open: boolean | undefined }>({
  open: undefined,
});

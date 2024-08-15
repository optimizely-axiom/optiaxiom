import { createContext } from "react";

export const GlobalNavContext = createContext<{ open: boolean | undefined }>({
  open: undefined,
});

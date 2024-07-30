import { createContext } from "react";

export const MenuContext = createContext<{ open: boolean | undefined }>({
  open: undefined,
});

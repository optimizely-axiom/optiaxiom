import { createContext } from "react";

export const PopoverContext = createContext<{ open: boolean | undefined }>({
  open: undefined,
});

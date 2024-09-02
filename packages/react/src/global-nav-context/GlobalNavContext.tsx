import { createContext } from "react";

export const GlobalNavContext = createContext<{
  expanded: boolean | undefined;
}>({
  expanded: undefined,
});

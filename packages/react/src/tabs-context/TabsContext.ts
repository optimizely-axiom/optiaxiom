import { createContext } from "react";

export const TabsContext = createContext<{
  appearance: "primary" | "secondary" | undefined;
}>({
  appearance: undefined,
});

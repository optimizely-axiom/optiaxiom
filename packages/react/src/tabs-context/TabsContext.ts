import { createContext } from "@radix-ui/react-context";

export const [TabsContextProvider, useTabsContext] = createContext<{
  appearance: "primary" | "secondary" | undefined;
}>("Tabs");

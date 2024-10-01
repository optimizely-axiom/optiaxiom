import { createContext } from "@radix-ui/react-context";

export const [GlobalNavContextProvider, useGlobalNavContext] = createContext<{
  expanded: boolean | undefined;
  onExpandedChange: (expanded: boolean) => void;
}>("GlobalNav");

import { createContext } from "@radix-ui/react-context";

export const [SelectContextProvider, useSelectContext] = createContext<{
  triggerId?: string;
  value?: string;
}>("Select");

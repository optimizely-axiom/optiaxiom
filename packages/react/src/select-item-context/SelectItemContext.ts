import { createContext } from "@radix-ui/react-context";

export const [SelectItemContextProvider, useSelectItemContext] = createContext<{
  active: boolean;
}>("SelectItem");

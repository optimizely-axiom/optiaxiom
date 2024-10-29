import { createContext } from "@radix-ui/react-context";

export const [AlertContextProvider, useAlertContext] = createContext<{
  descriptionId?: string;
  labelId?: string;
}>("Alert");

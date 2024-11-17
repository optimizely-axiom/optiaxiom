import { createContext } from "@radix-ui/react-context";

export const [CommandGroupContextProvider, useCommandGroupContext] =
  createContext<{
    id?: string;
  }>("CommandGroup", { id: undefined });

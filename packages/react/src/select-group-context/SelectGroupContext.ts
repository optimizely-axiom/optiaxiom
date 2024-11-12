import { createContext } from "@radix-ui/react-context";

export const [SelectGroupContextProvider, useSelectGroupContext] =
  createContext<{
    id?: string;
  }>("SelectGroup", { id: undefined });

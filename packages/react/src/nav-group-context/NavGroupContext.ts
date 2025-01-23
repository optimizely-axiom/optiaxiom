"use client";

import { createContext } from "@radix-ui/react-context";

export const [NavGroupContextProvider, useNavGroupContext] = createContext<{
  id?: string;
}>("NavGroup", { id: undefined });

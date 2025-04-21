"use client";

import { createContext } from "@radix-ui/react-context";

export const [NavGroupProvider, useNavGroupContext] = createContext<{
  id?: string;
}>("@optiaxiom/react/NavGroup", { id: undefined });

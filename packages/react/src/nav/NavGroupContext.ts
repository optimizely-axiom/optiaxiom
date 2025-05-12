"use client";

import { createContext } from "@radix-ui/react-context";

export const [NavGroupProvider, useNavGroupContext] = createContext<{
  collapsible?: boolean;
  id?: string;
}>("@optiaxiom/react/NavGroup", { collapsible: false, id: undefined });

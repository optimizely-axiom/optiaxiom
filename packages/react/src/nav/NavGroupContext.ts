"use client";

import { Context } from "radix-ui/internal";

export const [NavGroupProvider, useNavGroupContext] = Context.createContext<{
  id?: string;
}>("@optiaxiom/react/NavGroup", { id: undefined });

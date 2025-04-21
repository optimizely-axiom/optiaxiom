"use client";

import { createContext } from "@radix-ui/react-context";

export const [ListboxGroupProvider, useListboxGroupContext] = createContext<{
  id?: string;
}>("@optiaxiom/react/ListboxGroup", { id: undefined });

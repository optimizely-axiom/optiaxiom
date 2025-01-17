"use client";

import { createContext } from "@radix-ui/react-context";

export const [ListboxGroupContextProvider, useListboxGroupContext] =
  createContext<{
    id?: string;
  }>("ListboxGroup", { id: undefined });

"use client";

import { Context } from "radix-ui/internal";

export const [ListboxGroupProvider, useListboxGroupContext] =
  Context.createContext<{
    id?: string;
  }>("@optiaxiom/react/ListboxGroup", { id: undefined });

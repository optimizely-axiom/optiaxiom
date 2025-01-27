"use client";

import { createContext } from "@radix-ui/react-context";

export const [CardContextProvider, useCardContext] = createContext<{
  descriptionId?: string;
  labelId?: string;
}>("Card");

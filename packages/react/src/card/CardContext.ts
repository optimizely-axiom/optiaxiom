"use client";

import { createContext } from "@radix-ui/react-context";

export const [CardProvider, useCardContext] = createContext<{
  descriptionId?: string;
  labelId?: string;
}>("@optiaxiom/react/Card");

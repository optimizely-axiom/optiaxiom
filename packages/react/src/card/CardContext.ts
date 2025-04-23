"use client";

import { Context } from "radix-ui/internal";

export const [CardProvider, useCardContext] = Context.createContext<{
  descriptionId?: string;
  labelId?: string;
  orientation: "horizontal" | "vertical";
}>("@optiaxiom/react/Card");

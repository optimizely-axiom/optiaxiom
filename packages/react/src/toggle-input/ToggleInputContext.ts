"use client";

import { createContext } from "@radix-ui/react-context";

export const [ToggleInputProvider, useToggleInputContext] = createContext<{
  descriptionId?: string;
  labelId?: string;
}>("@optiaxiom/react/ToggleInput");

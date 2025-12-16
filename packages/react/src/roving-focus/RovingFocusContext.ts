"use client";

import { createContext } from "@radix-ui/react-context";

export const [RovingFocusProvider, useRovingFocusContext] = createContext<{
  disabled: boolean | undefined;
}>("@optiaxiom/react/RovingFocus");

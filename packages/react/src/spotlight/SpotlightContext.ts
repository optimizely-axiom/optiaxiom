"use client";

import { createContext } from "@radix-ui/react-context";

export const [SpotlightProvider, useSpotlightContext] = createContext<{
  disableHotkey?: boolean;
}>("@optiaxiom/react/Spotlight", {});

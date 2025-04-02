"use client";

import { createContext } from "@radix-ui/react-context";

export const [SpotlightProvider, useSpotlightContext] = createContext<{
  open?: boolean | undefined;
  setOpen: (open: boolean) => void;
}>("@optiaxiom/react/Spotlight");

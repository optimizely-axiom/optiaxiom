"use client";

import { createContext } from "@radix-ui/react-context";

export const [SegmentedControlContextProvider, useSegmentedControlContext] =
  createContext<Record<never, never>>("SegmentedControl");

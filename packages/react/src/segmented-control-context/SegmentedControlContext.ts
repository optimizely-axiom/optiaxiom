"use client";

import { createContext } from "@radix-ui/react-context";

export const [SegmentedControlProvider, useSegmentedControlContext] =
  createContext<Record<never, never>>("@optiaxiom/react/SegmentedControl");

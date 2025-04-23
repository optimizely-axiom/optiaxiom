"use client";

import { Context } from "radix-ui/internal";

export const [SegmentedControlProvider, useSegmentedControlContext] =
  Context.createContext<Record<never, never>>(
    "@optiaxiom/react/SegmentedControl",
  );

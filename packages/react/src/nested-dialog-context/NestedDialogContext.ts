"use client";

import { createContext } from "@radix-ui/react-context";

export const [NestedDialogProvider, useNestedDialogContext] =
  createContext<null | {
    onCountChange: (count: number) => void;
  }>("@optiaxiom/react/NestedDialog", null);

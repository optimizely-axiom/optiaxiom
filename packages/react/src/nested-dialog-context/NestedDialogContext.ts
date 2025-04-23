"use client";

import { Context } from "radix-ui/internal";

export const [NestedDialogProvider, useNestedDialogContext] =
  Context.createContext<null | {
    onCountChange: (count: number) => void;
  }>("@optiaxiom/react/NestedDialog", null);

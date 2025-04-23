"use client";

import { Context } from "radix-ui/internal";

export const [ToggleInputProvider, useToggleInputContext] =
  Context.createContext<{
    descriptionId?: string;
    labelId?: string;
  }>("@optiaxiom/react/ToggleInput");

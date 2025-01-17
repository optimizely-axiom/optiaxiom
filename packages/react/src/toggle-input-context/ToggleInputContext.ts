"use client";

import { createContext } from "@radix-ui/react-context";

export const [ToggleInputContextProvider, useToggleInputContext] =
  createContext<{
    descriptionId?: string;
    labelId?: string;
  }>("ToggleInput");

"use client";

import { createContext } from "@radix-ui/react-context";

export const [DrawerContextProvider, useDrawerContext] = createContext<{
  open?: boolean;
}>("Drawer");

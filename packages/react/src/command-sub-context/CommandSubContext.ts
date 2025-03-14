"use client";

import { createContext } from "@radix-ui/react-context";

export const [CommandSubProvider, useCommandSubContext] = createContext<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any;
}>("@optiaxiom/react/CommandSub");

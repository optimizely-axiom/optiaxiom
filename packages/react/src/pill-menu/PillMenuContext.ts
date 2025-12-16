"use client";

import { createContext } from "@radix-ui/react-context";

import type { CommandOption } from "../command/internals";

export const [PillMenuProvider, usePillMenuContext] = createContext<{
  value: CommandOption[] | readonly CommandOption[];
}>("@optiaxiom/react/PillMenu");

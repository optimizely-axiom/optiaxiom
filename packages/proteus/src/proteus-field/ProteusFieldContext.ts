"use client";

import { createContext } from "@radix-ui/react-context";

export const [ProteusFieldProvider, useProteusFieldContext] = createContext<{
  setError?: (id: string, message: string) => void;
}>("@optiaxiom/proteus/ProteusField", {});

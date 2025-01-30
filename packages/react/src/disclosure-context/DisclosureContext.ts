"use client";

import { createContext } from "@radix-ui/react-context";

export const [DisclosureContextProvider, useDisclosureContext] = createContext<{
  open: boolean | undefined;
}>("Disclosure");

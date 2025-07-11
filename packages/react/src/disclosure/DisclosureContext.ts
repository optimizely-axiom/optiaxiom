"use client";

import { createContext } from "@radix-ui/react-context";

export const [DisclosureProvider, useDisclosureContext] = createContext<{
  open: boolean | undefined;
  setOpen: (open: boolean) => void;
}>("@optiaxiom/react/Disclosure");

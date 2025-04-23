"use client";

import { Context } from "radix-ui/internal";

export const [DisclosureProvider, useDisclosureContext] =
  Context.createContext<{
    open: boolean | undefined;
  }>("@optiaxiom/react/Disclosure");

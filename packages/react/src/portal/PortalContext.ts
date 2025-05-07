"use client";

import { createContext } from "@radix-ui/react-context";

export const [PortalProvider, usePortalContext] = createContext<{
  container: ShadowRoot | undefined;
}>("@optiaxiom/react/Portal", { container: undefined });

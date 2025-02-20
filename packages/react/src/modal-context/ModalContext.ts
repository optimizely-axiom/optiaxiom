"use client";

import { createContext } from "@radix-ui/react-context";

export const [ModalContextProvider, useModalContext] = createContext<{
  enabled: boolean;
}>("Modal", { enabled: false });

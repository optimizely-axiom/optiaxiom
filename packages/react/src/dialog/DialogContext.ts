"use client";

import type { RefObject } from "react";

import { createContext } from "@radix-ui/react-context";

export const [DialogProvider, useDialogContext] = createContext<{
  footerRef: RefObject<HTMLDivElement>;
  headerRef: RefObject<HTMLDivElement>;
  nestedDialogCount: number;
  open?: boolean;
}>("@optiaxiom/react/Dialog");

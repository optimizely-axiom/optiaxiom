"use client";

import type { RefObject } from "react";

import { createContext } from "@radix-ui/react-context";

export const [DialogProvider, useDialogContext] = createContext<{
  cancelRef: RefObject<HTMLButtonElement>;
  footerRef: RefObject<HTMLDivElement>;
  headerRef: RefObject<HTMLDivElement>;
  nestedDialogCount: number;
  open: boolean | undefined;
  presence: boolean | undefined;
  setPresence: (presence: boolean) => void;
}>("@optiaxiom/react/Dialog");

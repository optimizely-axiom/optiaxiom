"use client";

import type { RefObject } from "react";

import { createContext } from "@radix-ui/react-context";

export const [DialogProvider, useDialogContext] = createContext<{
  cancelRef: RefObject<HTMLButtonElement>;
  footerRef: RefObject<HTMLDivElement>;
  headerRef: RefObject<HTMLDivElement>;
  nestedDialogCount: number;
  onCloseAutoFocus: (event: Event) => void;
  open: boolean | undefined;
  presence: boolean | undefined;
  setPresence: (presence: boolean) => void;
  triggerRef: RefObject<HTMLButtonElement>;
}>("@optiaxiom/react/Dialog");

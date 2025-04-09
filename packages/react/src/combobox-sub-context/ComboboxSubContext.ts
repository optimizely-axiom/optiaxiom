"use client";

import type { RefObject } from "react";

import { createContext } from "@radix-ui/react-context";

export const [ComboboxSubProvider, useComboboxSubContext] = createContext<{
  contentRef: RefObject<HTMLDivElement>;
  open: boolean | undefined;
  presence: boolean | undefined;
  setOpen: (presence: boolean) => void;
  setPresence: (presence: boolean) => void;
}>("@optiaxiom/react/ComboboxSub");

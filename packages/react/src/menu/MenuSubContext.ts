"use client";

import type { MutableRefObject, RefObject } from "react";

import { createContext } from "@radix-ui/react-context";

export const [MenuSubProvider, useMenuSubContext] = createContext<{
  contentRef: RefObject<HTMLDivElement>;
  inputRef: RefObject<HTMLInputElement>;
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: MutableRefObject<HTMLDivElement | null>;
}>("@optiaxiom/react/MenuSub");

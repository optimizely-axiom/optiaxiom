"use client";

import type { MutableRefObject, RefObject } from "react";

import { createContext } from "@radix-ui/react-context";

export const [MenuSubProvider, useMenuSubContext] = createContext<{
  contentRef: RefObject<HTMLDivElement>;
  inputRef: RefObject<HTMLInputElement>;
  itemRef: MutableRefObject<HTMLDivElement | null>;
  open: boolean;
  setOpen: (open: boolean) => void;
}>("@optiaxiom/react/MenuSub");

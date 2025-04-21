"use client";

import type { RefObject } from "react";

import { createContext } from "@radix-ui/react-context";

export const [MenuSubProvider, useMenuSubContext] = createContext<{
  contentRef: RefObject<HTMLDivElement>;
  inputRef: RefObject<HTMLInputElement>;
  level: number;
  open: boolean | undefined;
  setOpen: (presence: boolean) => void;
}>("@optiaxiom/react/MenuSub");

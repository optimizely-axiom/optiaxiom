"use client";

import type { RefObject } from "react";

import { createContext } from "@radix-ui/react-context";

export const [MenuSubProvider, useMenuSubContext] = createContext<{
  inputRef: RefObject<HTMLInputElement>;
  open: boolean;
  setOpen: (open: boolean) => void;
}>("@optiaxiom/react/MenuSub");

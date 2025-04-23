"use client";

import type { RefObject } from "react";

import { Context } from "radix-ui/internal";

export const [MenuSubProvider, useMenuSubContext] = Context.createContext<{
  inputRef: RefObject<HTMLInputElement>;
  open: boolean;
  setOpen: (open: boolean) => void;
}>("@optiaxiom/react/MenuSub");

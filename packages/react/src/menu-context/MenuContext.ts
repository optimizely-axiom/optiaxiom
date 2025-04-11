"use client";

import type { RefObject } from "react";

import { createContext } from "@radix-ui/react-context";

export const [MenuProvider, useMenuContext] = createContext<{
  defaultInputVisible: boolean;
  inputRef: RefObject<HTMLInputElement>;
  open?: boolean | undefined;
  placeholder: string | undefined;
  setOpen: (open: boolean) => void;
  size: "lg" | "sm";
}>("@optiaxiom/react/Menu");

"use client";

import type { RefObject } from "react";

import { createContext } from "@radix-ui/react-context";

export const [ComboboxProvider, useComboboxContext] = createContext<{
  defaultInputVisible: boolean;
  inputRef: RefObject<HTMLInputElement>;
  open?: boolean | undefined;
  placeholder: string | undefined;
  setOpen: (open: boolean) => void;
  size: "lg" | "sm";
}>("@optiaxiom/react/Combobox");

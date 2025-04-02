"use client";

import type { RefObject } from "react";

import { createContext } from "@radix-ui/react-context";

export const [DropdownMenuComboboxProvider, useDropdownMenuComboboxContext] =
  createContext<{
    inputRef: RefObject<HTMLInputElement>;
  }>("@optiaxiom/react/DropdownMenuCombobox");

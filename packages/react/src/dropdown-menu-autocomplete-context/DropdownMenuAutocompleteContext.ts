"use client";

import type { RefObject } from "react";

import { createContext } from "@radix-ui/react-context";

export const [
  DropdownMenuAutocompleteProvider,
  useDropdownMenuAutocompleteContext,
] = createContext<{
  inputRef: RefObject<HTMLInputElement>;
}>("@optiaxiom/react/DropdownMenuAutocomplete");

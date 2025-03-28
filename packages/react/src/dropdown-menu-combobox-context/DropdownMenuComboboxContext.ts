"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { RefObject } from "react";

import { createContext } from "@radix-ui/react-context";

export const [DropdownMenuComboboxProvider, useDropdownMenuComboboxContext] =
  createContext<{
    inputRef: RefObject<HTMLInputElement>;
    inputValue?: string;
    isItemDisabled?: (item: any, index: number) => boolean;
    isItemSelected?: (item: any, index: number) => boolean;
    items: any[];
    itemToLabel?: (item: any) => string;
    onInputValueChange?: (value: string) => void;
    onItemSelect?: (value: any) => void;
  }>("@optiaxiom/react/DropdownMenuCombobox");

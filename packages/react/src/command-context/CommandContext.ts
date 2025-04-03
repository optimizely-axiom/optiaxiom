"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { UseComboboxReturnValue } from "downshift";

import { createContext } from "@radix-ui/react-context";

export const [CommandProvider, useCommandContext] = createContext<{
  downshift: UseComboboxReturnValue<any>;
  highlightedItem: any;
  highlightedSubIndex: number;
  isItemDisabled: (item: any, index: number) => boolean;
  isItemSelected: (item: any, index: number) => boolean;
  items: any[] | readonly any[];
  itemToLabel: (item: any) => string;
  itemToSubItems?: (item: any) => any[] | undefined;
  lastInteractionSource: "keyboard" | "pointer";
  placed: boolean;
  setHighlightedIndex: (index: number, source: "keyboard" | "pointer") => void;
  setHighlightedSubIndex: (
    index: number,
    source: "keyboard" | "pointer",
  ) => void;
  setInputValue: (value: string) => void;
  setPlaced: (placed: boolean) => void;
}>("@optiaxiom/react/Command");

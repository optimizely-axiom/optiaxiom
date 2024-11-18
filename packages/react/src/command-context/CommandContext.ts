/* eslint-disable @typescript-eslint/no-explicit-any */

import type { UseComboboxReturnValue } from "downshift";

import { createContext } from "@radix-ui/react-context";

export const [CommandContextProvider, useCommandContext] = createContext<{
  downshift: UseComboboxReturnValue<any>;
  highlightedItem: any;
  highlightedSubIndex: number;
  isItemDisabled: (item: any, index: number) => boolean;
  items: any[];
  itemToSubItems?: (item: any) => any[] | null;
  setHighlightedIndex: (index: number) => void;
  setHighlightedSubIndex: (index: number) => void;
  setInputValue: (value: string) => void;
  value?: Set<any>;
}>("Command");

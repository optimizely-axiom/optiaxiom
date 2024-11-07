/* eslint-disable @typescript-eslint/no-explicit-any */

import type { UseComboboxReturnValue } from "downshift";

import { createContext } from "@radix-ui/react-context";

export const [CommandContextProvider, useCommandContext] = createContext<{
  downshift: UseComboboxReturnValue<any>;
  highlightedItem: any;
  isItemDisabled: (item: any, index: number) => boolean;
  items: any[];
  itemToKey: (item: any) => string;
  itemToString: (item: any) => string;
  setInputValue: (value: string) => void;
  setOpen?: (open: boolean) => void;
  setValue?: (value: any) => void;
}>("Command");

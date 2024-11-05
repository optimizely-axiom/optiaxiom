/* eslint-disable @typescript-eslint/no-explicit-any */

import type { UseComboboxReturnValue } from "downshift";

import { createContext } from "@radix-ui/react-context";

export const [ComboboxContextProvider, useComboboxContext] = createContext<{
  downshift: UseComboboxReturnValue<any>;
  highlightedItem: any;
  items: any[];
  itemToKey: (item: any) => string;
  itemToString: (item: any) => string;
  mode?: "multiple" | "single" | undefined;
  open?: boolean | undefined;
  setInputValue: (value: string) => void;
  setOpen: (open: boolean) => void;
  setValue: (value: any) => void;
  value?: any | undefined;
}>("Combobox");

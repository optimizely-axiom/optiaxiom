/* eslint-disable @typescript-eslint/no-explicit-any */
import type { UseComboboxReturnValue } from "downshift";

import { createContext } from "@radix-ui/react-context";

export const [AutocompleteContextProvider, useAutocompleteContext] =
  createContext<{
    disabled?: boolean;
    downshift: UseComboboxReturnValue<any>;
    highlightedItem: any;
    items: any[];
    itemToKey: (item: any) => string;
    setInputValue: (value: string) => void;
  }>("Autocomplete");

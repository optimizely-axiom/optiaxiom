import type { UseComboboxReturnValue } from "downshift";

import { createContext } from "@radix-ui/react-context";

export const [AutocompleteContextProvider, useAutocompleteContext] =
  createContext<{
    disabled?: boolean;
    downshift: UseComboboxReturnValue<unknown>;
    highlightedItem: unknown;
    itemToString?: (item: unknown) => string;
    items: unknown[];
    onValueChange?: (value: string) => void;
  }>("Autocomplete");

/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from "@radix-ui/react-context";

export const [AutocompleteContextProvider, useAutocompleteContext] =
  createContext<{
    disabled?: boolean;
    isOpen: boolean | undefined;
    items: any[];
    selectedItem: any;
    setSelectedItem: (item: any) => void;
  }>("Autocomplete");

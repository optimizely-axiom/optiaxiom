/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from "@radix-ui/react-context";

export const [AutocompleteItemContextProvider, useAutocompleteItemContext] =
  createContext<{
    active?: any;
  }>("AutocompleteItem");

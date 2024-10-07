import { createContext } from "@radix-ui/react-context";

export const [AutocompleteListContextProvider, useAutocompleteListContext] =
  createContext<{
    active: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    item: any;
  }>("AutocompleteList");

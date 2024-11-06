import { createContext } from "@radix-ui/react-context";

export const [AutocompleteItemContextProvider, useAutocompleteItemContext] =
  createContext<{
    active: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    item: any;
  }>("AutocompleteItem");

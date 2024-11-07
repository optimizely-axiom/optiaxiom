/* eslint-disable @typescript-eslint/no-explicit-any */

import { createContext } from "@radix-ui/react-context";

export const [ComboboxContextProvider, useComboboxContext] = createContext<{
  isItemDisabled: (item: any, index: number) => boolean;
  items: any[];
  itemToKey: (item: any) => string;
  itemToString: (item: any) => string;
  onInputValueChange?: (value: string) => void;
  onSelect?: (value: any) => void;
  open?: boolean | undefined;
  setOpen: (open: boolean) => void;
}>("Combobox");

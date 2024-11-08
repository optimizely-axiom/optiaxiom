/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Fragment } from "react";

import { createContext } from "@radix-ui/react-context";

import type { Dialog } from "../dialog";
import type { DialogContent } from "../dialog-content";
import type { DialogTitle } from "../dialog-title";
import type { DialogTrigger } from "../dialog-trigger";
import type { Popover } from "../popover";
import type { PopoverContent } from "../popover-content";
import type { PopoverTrigger } from "../popover-trigger";

export const [ComboboxContextProvider, useComboboxContext] = createContext<{
  components: {
    Content: typeof DialogContent | typeof PopoverContent;
    Root: typeof Dialog | typeof Popover;
    Title: typeof DialogTitle | typeof Fragment;
    Trigger: typeof DialogTrigger | typeof PopoverTrigger;
  };
  isItemDisabled: (item: any, index: number) => boolean;
  items: any[];
  itemToKey: (item: any) => string;
  itemToString: (item: any) => string;
  onInputValueChange?: (value: string) => void;
  onItemSelect?: (value: any) => void;
  open?: boolean | undefined;
  setOpen: (open: boolean) => void;
  value?: Set<any>;
}>("Combobox");

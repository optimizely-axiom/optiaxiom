"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { createContext } from "@radix-ui/react-context";

import type { ComboboxDialogContent } from "../combobox-dialog-content";
import type { ComboboxPopoverContent } from "../combobox-popover-content";
import type { Dialog } from "../dialog";
import type { DialogTrigger } from "../dialog-trigger";
import type { Popover } from "../popover";
import type { PopoverTrigger } from "../popover-trigger";

export const [ComboboxProvider, useComboboxContext] = createContext<{
  components: {
    Content: typeof ComboboxDialogContent | typeof ComboboxPopoverContent;
    Root: typeof Dialog | typeof Popover;
    Trigger: typeof DialogTrigger | typeof PopoverTrigger;
  };
  inputValue?: string;
  isItemDisabled: (item: any, index: number) => boolean;
  isItemSelected: (item: any, index: number) => boolean;
  items: any[];
  itemToLabel: (item: any) => string;
  onInputValueChange?: (value: string) => void;
  onItemSelect?: (value: any) => void;
  open?: boolean | undefined;
  setOpen: (open: boolean) => void;
}>("@optiaxiom/react/Combobox");

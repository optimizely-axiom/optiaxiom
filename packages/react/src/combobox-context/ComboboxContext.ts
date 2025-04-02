"use client";

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
  open?: boolean | undefined;
  setOpen: (open: boolean) => void;
}>("@optiaxiom/react/Combobox");

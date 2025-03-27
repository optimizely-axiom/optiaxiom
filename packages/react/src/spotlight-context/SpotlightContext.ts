"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { createContext } from "@radix-ui/react-context";

export const [SpotlightProvider, useSpotlightContext] = createContext<{
  inputValue?: string;
  isItemDisabled: (item: any, index: number) => boolean;
  items: any[];
  itemToLabel: (item: any) => string;
  itemToSubItems?: (item: any) => any[] | null;
  onInputValueChange?: (value: string) => void;
  onItemSelect?: (value: any) => void;
  open?: boolean | undefined;
  setOpen: (open: boolean) => void;
}>("@optiaxiom/react/Spotlight");

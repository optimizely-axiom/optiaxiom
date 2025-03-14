"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import type { UseSelectReturnValue } from "downshift";

import { createContext } from "@radix-ui/react-context";

export const [SelectProvider, useSelectContext] = createContext<{
  disabled?: boolean;
  downshift: UseSelectReturnValue<any>;
  highlightedItem: any;
  isOpen: boolean | undefined;
  items: any[];
  itemToKey: (item: any) => string;
  itemToString: (item: any) => string;
  placed: boolean;
  selectedItem: any;
  setPlaced: (placed: boolean) => void;
}>("@optiaxiom/react/Select");

"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import type { UseSelectReturnValue } from "downshift";
import type { FocusEventHandler } from "react";

import { createContext } from "@radix-ui/react-context";

export const [SelectProvider, useSelectContext] = createContext<{
  disabled?: boolean;
  downshift: UseSelectReturnValue<any>;
  highlightedItem: any;
  isOpen: boolean | undefined;
  items: any[];
  itemToLabel: (item: any) => string;
  itemToValue: (item: any) => string | undefined;
  onBlur: FocusEventHandler<HTMLElement> | undefined;
  placed: boolean;
  selectedItem: any;
  setPlaced: (placed: boolean) => void;
}>("@optiaxiom/react/Select");

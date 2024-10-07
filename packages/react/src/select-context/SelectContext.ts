/* eslint-disable @typescript-eslint/no-explicit-any */
import type { UseSelectReturnValue } from "downshift";

import { createContext } from "@radix-ui/react-context";

export const [SelectContextProvider, useSelectContext] = createContext<{
  disabled?: boolean;
  downshift: UseSelectReturnValue<any>;
  highlightedItem: any;
  items: any[];
}>("Select");

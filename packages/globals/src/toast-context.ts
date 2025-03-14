import type { RefObject } from "react";

import { createContext } from "@radix-ui/react-context";

export const [ToastProviderProvider, useToastProviderContext] = createContext<{
  offset: number;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  toastRef: RefObject<HTMLElement>;
}>("@optiaxiom/react/ToastProvider");

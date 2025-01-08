import type { RefObject } from "react";

import { createContext } from "@radix-ui/react-context";

export const [ToastContextProvider, useToastContext] = createContext<{
  offset: number;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  toastRef: RefObject<HTMLElement>;
}>("ToastProvider");

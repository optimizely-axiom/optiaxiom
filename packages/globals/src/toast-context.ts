import type { RefObject } from "react";

import { Context } from "radix-ui/internal";

export const [ToastProviderProvider, useToastProviderContext] =
  Context.createContext<{
    offset: number;
    onOpenChange: (open: boolean) => void;
    open: boolean;
    toastRef: RefObject<HTMLElement>;
  }>("@optiaxiom/react/ToastProvider");
